import { Request, Response } from "express" 
import { container } from "tsyringe"
import { UpdateSaleAndProductsAssociateUseCase } from "../usecases/update-sale-and-product-sold-associate"


export class UpdateSaleAndProductsAssociateController {

  async handle(request: Request, response: Response) {
    const { date, customer_id, products_sold, salesman } = request.body 
    const { id } = request.params

    const updateSaleService = container.resolve(UpdateSaleAndProductsAssociateUseCase)
    const result = await updateSaleService.execute({ 
      id,
      date,
      customer_id,
      products_sold,
      salesman
    })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.json(result.value)
  }
}