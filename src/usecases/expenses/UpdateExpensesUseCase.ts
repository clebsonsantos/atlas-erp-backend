import { Expenses } from '../../entities/Expenses';
import { ExpenseRepository } from '../../repositories';

type ExpenseType = {
  id: string;
  description: string;
  quantity: number;
  amount: number;
  frequency: string;
  type: string;
  date: Date;
  center_cost_id: string;
  category_id: string
}


export class UpdateExpensesUseCase  {

  async execute({id, description, quantity, amount, frequency, type, date, center_cost_id, category_id}: ExpenseType): Promise< Expenses | Error> {

    const expenseRepository = ExpenseRepository() 

    const expense = await expenseRepository.findOne({id})

    if(!expense){
      return new Error('Despesa não encontrada.')
    }

    expense.description = description ? description : expense.description;
    expense.quantity = quantity ? quantity : expense.quantity;
    expense.amount = amount ? amount : expense.amount;
    expense.frequency = frequency ? frequency : expense.frequency;
    expense.type = type ? type  : expense.type;
    expense.date = date ? date  : expense.date;
    expense.center_cost_id = center_cost_id ? center_cost_id : expense.center_cost_id;
    expense.category_id = category_id ? category_id : expense.category_id;

    expenseRepository.save(expense)

    return expense
    
  }
}
