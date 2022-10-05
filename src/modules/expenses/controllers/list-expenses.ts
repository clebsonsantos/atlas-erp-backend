
import { Request, Response } from "express" 
import { container } from "tsyringe" 
import { ListExpensesUseCase } from "../usecases/list-expenses" 

export class ListExpensesController {
  async handle(request: Request, response: Response) {
    const listExpensesService = container.resolve(ListExpensesUseCase)
    const result = await listExpensesService.execute()
    return response.status(200).json(result)
  }
}