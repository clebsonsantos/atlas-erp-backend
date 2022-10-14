
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { ListAllSalesAndProductsUseCase } from "../usecases/list-all-sale-and-products-sold"

export class ListAllSaleProductsController {

  async handle(request: Request, response: Response) {

    const getAllSales = container.resolve(ListAllSalesAndProductsUseCase)
    const sales = await getAllSales.execute() 

    return response.json(sales) 
  }
}