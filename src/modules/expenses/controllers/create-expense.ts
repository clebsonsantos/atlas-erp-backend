
import { Request, Response } from "express" 
import { container } from "tsyringe" 
import { CreateExpenseUseCase } from "../usecases/create-expense" 


export class CreateExpensesController {

  async handle(request: Request, response: Response) {
    const {
      description,
      quantity,
      amount,
      frequency,
      type,
      date,
      category_id,
      center_cost_id
    } = request.body 

    const createExpenseService = container.resolve(CreateExpenseUseCase)

    const result = await createExpenseService.execute({
      description,
      quantity,
      amount,
      frequency,
      type,
      date,
      category_id,
      center_cost_id
    }) 
    
    if(result.isLeft()){
     return response.status(result.value.statusCode).json(result.value)
    }
    
    return response.json(result.value)
  }
}