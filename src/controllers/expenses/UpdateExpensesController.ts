
import { Request, Response } from "express";
import { UpdateExpensesUseCase } from '../../modules/expenses/UpdateExpensesUseCase';


export class UpdateExpensesController {

  async handle(request: Request, response: Response) {

    const { description, quantity, amount, frequency, type, date, center_cost_id, category_id } = request.body
    const { id } = request.params

    const expense = new UpdateExpensesUseCase()

    const result = await expense.execute({id, description, quantity, amount, frequency, type, date, center_cost_id, category_id })

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }
}