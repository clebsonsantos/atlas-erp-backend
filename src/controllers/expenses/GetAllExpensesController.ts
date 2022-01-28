
import { Request, Response } from "express";
import { GetAllExpensesUseCase } from '../../usecases/expenses/GetAllExpensesUseCase';



export class GetAllExpensesController {

  async handle(request: Request, response: Response) {
    const getAllExpenses = new GetAllExpensesUseCase()
    const result = await getAllExpenses.execute()

    return response.status(200).json(result)
  }
}