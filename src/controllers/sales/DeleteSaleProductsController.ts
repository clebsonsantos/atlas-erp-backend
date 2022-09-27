
import { Request, Response } from "express";
import { DeleteSaleProductsUseCase } from '../../modules/sales/DeleteSaleProductsUseCase';



export class DeleteSaleProductsController {

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteSaleProducts = new DeleteSaleProductsUseCase()

    const result = await deleteSaleProducts.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }
}