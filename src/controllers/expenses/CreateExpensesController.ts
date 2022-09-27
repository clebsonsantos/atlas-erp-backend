
import { Request, Response } from "express";
import { CreateExpenseUseCase } from '../../modules/expenses/CreateExpenseUseCase';


export class CreateExpensesController {

  async handle(request: Request, response: Response) {
    const { description, quantity, amount, frequency, type, date, category_id, center_cost_id} = request.body;

    const createExpensesController = new CreateExpenseUseCase();

    const result = await createExpensesController.execute({
      description, quantity, amount, frequency, type, date, category_id, center_cost_id
    });
    
    if(result instanceof Error){
    return response.status(400).json(result.message)

    }
    
    return response.json(result)

  }
}