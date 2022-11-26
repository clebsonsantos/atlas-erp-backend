import { inject, injectable } from "tsyringe"
import { ProductsSoldRepository } from "../repositories/product-sold-repository"
import { SaleRepository } from "../repositories/sales-repository"
import { UpdateSaleAndProductsSoldAssociate } from "../contracts/update-sale-and-products-sold-associate"
import { AppError } from "@/shared/errors/AppError"
import { left, right } from "@/shared/either"


@injectable()
export class UpdateSaleAndProductsAssociateUseCase  {
  constructor(
    @inject("SaleRepository")
    private readonly saleRepository: SaleRepository,
    @inject("ProductsSoldRepository")
    private readonly productSoldRepository: ProductsSoldRepository
  ){}

  async execute({ id, date, customer_id, products_sold, salesman }: UpdateSaleAndProductsSoldAssociate.SalesInput): Promise<UpdateSaleAndProductsSoldAssociate.Output> {

    
    const sale = await this.saleRepository.findById(id)
    
    if(!sale){
      return left(new AppError("Este registro não existe.", 404) )
    }

    sale.customer_id = customer_id ? customer_id : sale.customer_id
    sale.date = date ? date : sale.date
    sale.salesman = salesman ? salesman : sale.salesman

    const idsProductsSolds = new Array()

    //Editar produto existente
    for await (const item of sale.products_sold){

      for await (const product of products_sold){
        if(product.id === item.id){
          const productSold = await this.productSoldRepository.findById(product.id)
          
          productSold.id_product = product.id_product ? product.id_product : productSold.id_product
          productSold.price_unit = product.price_unit ? product.price_unit : productSold.price_unit
          productSold.total_price = product.total_price ? product.total_price : productSold.total_price
          productSold.quantity = product.quantity ? product.quantity : productSold.quantity
          await this.productSoldRepository.update(productSold)
          idsProductsSolds.push(productSold.id)
        }
      }
    }    
    
    //Remover produto com tag [delete]
    for await(const product of products_sold){
      if(product.delete){
        const productSold = await this.productSoldRepository.findById(product.id)

        if(!productSold){
          return left(new AppError("Este registro não existe: ".concat(product.id)))
        }
        
        const deleteProduct = await this.productSoldRepository.delete(productSold.id)
        if (!deleteProduct) {
          return left(new AppError("Não é possível deletar esse registro: ".concat(product.id)))
        }
        const index = idsProductsSolds.indexOf(product.id)
        idsProductsSolds.splice(index, 1)
      }
    }

    //Inserir um novo produto na venda
    for await (const newProducts of products_sold){
      if(!newProducts.id){
        const productsSold = await this.productSoldRepository.add(newProducts)
        idsProductsSolds.push(productsSold.id)
      }
    }

    const soldsExists = await this.productSoldRepository.findByIds(idsProductsSolds)

    sale.products_sold = soldsExists
    await this.saleRepository.update(sale)

    return right(sale)
  }
}
