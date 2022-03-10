import { Sales } from '../../entities/Sales';
import {
  CustomerRepository,
  ProductsSoldsRepository,
  RelationsSaleProductsRepository,
  SalesRepository } from '../../repositories';


type IproductsSolds = {
    id_product: string,
    quantity: number,
    price_unit: number,
    total_price: number
}
type ISales = {
  date: Date,
  customer_id: string,
  products_sold: IproductsSolds[]
}


export class CreateSaleProductsSoldUseCase  {

  async execute({
    date, 
    customer_id, 
    products_sold
  }: ISales): Promise< any | Error> {

    if(!await CustomerRepository().findOne(customer_id)){
      return new Error("Este cliente não existe.");
    }

    let id_products_sold = new Array()
    const sale = SalesRepository().create({
      date,
      customer_id,
    })

    products_sold.forEach(async (item)=> {
      const productsSold = ProductsSoldsRepository().create(item)
      id_products_sold.push(productsSold.id)
      
      await ProductsSoldsRepository().save(productsSold)
      const relation = RelationsSaleProductsRepository().create({sale_id: sale.id, products_sold_id: productsSold.id})
      await RelationsSaleProductsRepository().save(relation)
    })


    const productsSoldExists = await ProductsSoldsRepository().findByIds(id_products_sold)

    sale.products_sold = productsSoldExists

    
    await SalesRepository().save(sale)
    
    return sale

  }
}
