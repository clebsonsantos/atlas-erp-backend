import { ProductSales } from '../../entities/ProductSales';
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
  }: ISales): Promise< Sales | Error> {

    if(!await CustomerRepository().findOne(customer_id)){
      return new Error("Este cliente não existe.");
    }

    
    const sale = SalesRepository().create({
      date,
      customer_id,
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
