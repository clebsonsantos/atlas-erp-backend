import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { DeleteSaleAndProductsSold } from "./contracts/delete-sale-and-products-sold"
import { ProductsSoldRepository } from "./repositories/product-sold-repository"
import { SaleRepository } from "./repositories/sales-repository"

@injectable()
export class DeleteSaleProductsUseCase  {
  constructor(
    @inject("SaleRepository")
    private readonly saleRepository: SaleRepository,
    @inject("ProductsSoldRepository")
    private readonly productSoldRepository: ProductsSoldRepository, 
  ){}

  async execute({ id }: DeleteSaleAndProductsSold.Params): Promise<DeleteSaleAndProductsSold.Result> {

    const sale = await this.saleRepository.findById(id)

    if(!sale){
      return left(new AppError("Pedido de venda não encontrado.", 404))
    }
    
    const deleteSale = await this.saleRepository.delete(sale.id)
    if (!deleteSale) {
      return left(new AppError("Não é possível deletar esse registro. Verifique se há lançamentos dependentes."))
    }
    
    sale?.products_sold.forEach(async ({ id }) => {
      await this.productSoldRepository.delete(id)
    })
    return right("Pedido de venda deletado com sucesso.")
  }
}
