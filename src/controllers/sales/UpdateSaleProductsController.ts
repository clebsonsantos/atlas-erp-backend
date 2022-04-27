
import { Request, Response } from "express";
import { UpdatesaleProductsUseCase } from '../../usecases/sales/UpdatesaleProductsUseCase';


export class UpdateSaleProductsController {

  async handle(request: Request, response: Response) {
    const { date, customer_id, products_sold, salesman } = request.body;
    const { id } = request.params

    const updateSale = new UpdatesaleProductsUseCase()
    const result = await updateSale.execute({id, date, customer_id, products_sold, salesman})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json(result)

  }
}