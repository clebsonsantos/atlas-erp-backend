import {
  CustomerRepository,
  ProductsSoldsRepository,
  SalesRepository } from '../../repositories';
import { Sales } from "./infra/typeorm/entities/sale";


type IproductsSolds = {
    id_product: string,
    quantity: number,
    price_unit: number,
    total_price: number
}
type ISales = {
  date: Date,
  customer_id: string,
  salesman: string,
  userId?: string, // logged user
  products_sold: IproductsSolds[]
}


export class CreateSaleProductsSoldUseCase  {

  async execute({
    date, 
    customer_id, 
    salesman,
    userId,
    products_sold
  }: ISales): Promise< Sales | Error> {

    if(!await CustomerRepository().findOne(customer_id)){
      return new Error("Este cliente não existe.");
    }

    const sales = await SalesRepository().find()
    const sale_number = sales.length + 1
    const salesman_id = salesman ? salesman : userId
    const sale = SalesRepository().create({
      date,
      customer_id,
      salesman: salesman_id,
      sale_number
    })
    
    const ids_products = new Array()
    
    for await (const product of products_sold){
      const productsSold = ProductsSoldsRepository().create(product)
      ids_products.push(productsSold.id)
      await ProductsSoldsRepository().save(productsSold)
    }
    
    const productsExists = await ProductsSoldsRepository().findByIds(ids_products)
    sale.products_sold = productsExists
    
    await SalesRepository().save(sale)
    
    return sale

  }
}
