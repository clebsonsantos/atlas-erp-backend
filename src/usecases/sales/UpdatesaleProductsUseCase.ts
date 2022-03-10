import { Sales } from '../../entities/Sales';
import { ProductsSoldsRepository, SalesRepository } from '../../repositories'

type IproductsSolds = {
  id: string;
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

    const soldsEditProducts = new Array()
    sale.products_sold.forEach(async (item) => {

      products_sold.forEach(async(solds)=> {
        if(solds.id === item.id){
          const productSold = await ProductsSoldsRepository().findOne({id: solds.id})
          if(!productSold){
            return new Error("Esta transação de venda não existe.");
          }

          productSold.id_product = solds.id_product ? solds.id_product : productSold.id_product
          productSold.price_unit = solds.price_unit ? solds.price_unit : productSold.price_unit
          productSold.total_price = solds.total_price ? solds.total_price : productSold.total_price
          productSold.quantity = solds.quantity ? solds.quantity : productSold.quantity
          await ProductsSoldsRepository().save(productSold)
          soldsEditProducts.push(productSold)
        }
      })
    })
    
    await SalesRepository().save(sale)
    sale.products_sold = soldsEditProducts

    return sale



    
  }
}
