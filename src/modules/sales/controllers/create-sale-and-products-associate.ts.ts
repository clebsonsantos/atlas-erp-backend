
import { CreateSaleAndProductsAssociateUseCase } from "@/modules/sales/usecases/create-sale-and-products-associate"
import { Request, Response } from "express" 
import { container } from "tsyringe"


export class CreateSaleAndProductsAssociateController {

  async handle(request: Request, response: Response) {
    const { date, customer_id, products_sold, salesman } = request.body 
    const { userId } = request 

    const saleUseCase = container.resolve(CreateSaleAndProductsAssociateUseCase)
    const result = await saleUseCase.execute({ date, customer_id, products_sold, salesman: salesman, userId })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.json(result.value)
  }
}