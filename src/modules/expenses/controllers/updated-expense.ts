import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateExpensesUseCase } from "../usecases/updated-expense";


export class UpdateExpensesController {

  async handle(request: Request, response: Response) {

    const { description, quantity, amount, frequency, type, date, center_cost_id, category_id } = request.body
    const { id } = request.params

    const updatedExpenseService = container.resolve(UpdateExpensesUseCase)

    const result = await updatedExpenseService.execute({ 
      id,
      description,
      quantity,
      amount,
      frequency,
      type,
      date,
      center_cost_id,
      category_id
    })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }
    return response.status(200).json(result.value)
  }
}