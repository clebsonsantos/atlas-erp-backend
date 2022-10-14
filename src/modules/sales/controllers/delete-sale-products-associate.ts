
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { DeleteSaleProductsAssociateUseCase } from "../usecases/delete-sale-products-associate"

export class DeleteSaleProductsAssociateController {

  async handle(request: Request, response: Response) {
    const { id } = request.params 

    const deleteSaleProducts = container.resolve(DeleteSaleProductsAssociateUseCase)

    const result = await deleteSaleProducts.execute({ id })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.status(200).json(result.value)
  }
}