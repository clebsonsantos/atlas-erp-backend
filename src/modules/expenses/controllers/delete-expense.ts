
import { Request, Response } from "express" 
import { container } from "tsyringe" 
import { DeleteExpenseUseCase } from "../usecases/delete-expense" 

export class DeleteExpenseController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteExpense = container.resolve(DeleteExpenseUseCase)

    const result = await deleteExpense.execute({ id })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }
    return response.json(result.value)
  }
}