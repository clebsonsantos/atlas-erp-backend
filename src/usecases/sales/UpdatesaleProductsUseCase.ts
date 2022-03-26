import { Sales } from '../../entities/Sales';
import { ProductsSoldsRepository, RelationsSaleProductsRepository, SalesRepository } from '../../repositories'

type IproductsSolds = {
  id?: string;
  delete?: boolean;
  id_product: string,
  quantity: number,
  price_unit: number,
  total_price: number;
  created_at: Date
}
type ISales = {
  id: string
  date: Date,
  customer_id: string,
  products_sold: IproductsSolds[]
}


export class UpdatesaleProductsUseCase  {

  async execute({ id, date, customer_id, products_sold }: ISales): Promise< Sales | Error> {

    
    const sale = await SalesRepository().findOne({id}, {relations: ["products_sold"]})
    
    if(!sale){
      return new Error("Este pedido/venda não existe.");
    }

    sale.customer_id = customer_id ? customer_id : sale.customer_id
    sale.date = date ? date : sale.date

    const ids_soldsProducts = new Array()

    //Editar produto existente
    for await (const item of sale.products_sold){

      for await (const product of products_sold){
        if(product.id === item.id){
          const productSold = await ProductsSoldsRepository().findOne({id: product.id})
          
          productSold.id_product = product.id_product ? product.id_product : productSold.id_product
          productSold.price_unit = product.price_unit ? product.price_unit : productSold.price_unit
          productSold.total_price = product.total_price ? product.total_price : productSold.total_price
          productSold.quantity = product.quantity ? product.quantity : productSold.quantity
          await ProductsSoldsRepository().save(productSold)
          ids_soldsProducts.push(productSold.id)
        }
        
      }
      
    }    
    
    //Remover produto com tag [delete]
    for await(const product of products_sold){
      if(product.delete == true){
        const productSold = await ProductsSoldsRepository().findOne({id: product.id})

        if(!productSold){
          return new Error("Este(s) lançamento(s) não existe(m).")
        }
        
        await ProductsSoldsRepository().delete(productSold.id)
        const index = ids_soldsProducts.indexOf(product.id)
        ids_soldsProducts.splice(index, 1)

      }

    }

    //Inserir um novo produto na venda
    for await (const newProducts of products_sold){
      if(!newProducts.id){
        const productsSold = ProductsSoldsRepository().create(newProducts)
        await ProductsSoldsRepository().save(productsSold)
        ids_soldsProducts.push(productsSold.id)
      }
    }

    const soldsExists = await ProductsSoldsRepository().findByIds(ids_soldsProducts)

    sale.products_sold = soldsExists
    await SalesRepository().save(sale)

    return sale
  }
}
