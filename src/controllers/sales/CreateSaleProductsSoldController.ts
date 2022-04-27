
import { Request, Response } from "express";
import { CreateSaleProductsSoldUseCase } from '../../usecases/sales/CreateSaleProductsSoldUseCase';


export class CreateSaleProductsSoldController {

  async handle(request: Request, response: Response) {
    const { date, customer_id, products_sold, salesman } = request.body;
    const { userId } = request;

    const saleUseCase = new CreateSaleProductsSoldUseCase()
    const result = await saleUseCase.execute({date, customer_id, products_sold, salesman, userId})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}