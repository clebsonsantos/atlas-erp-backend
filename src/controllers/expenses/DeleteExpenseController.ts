
import { Request, Response } from "express";
import { DeleteExpenseUseCase } from '../../usecases/expenses/DeleteExpenseUseCase';



export class DeleteExpenseController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteExpense = new DeleteExpenseUseCase()

    const result = await deleteExpense.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json("Registro deletado com sucesso!")
  }
}