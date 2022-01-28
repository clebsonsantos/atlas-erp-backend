import { Expenses } from '../../entities/Expenses';
import { CategoryRepository, CenterCostRepository, ExpenseRepository } from '../../repositories';

type ExpenseTypes = {
  
  description: string;
  amount: number;
  quantity: number;
  frequency: string;
  type: string;
  date: Date;
  center_cost_id: string;
  category_id: string
}

export class CreateExpenseUseCase  {

  async execute({ description, amount, quantity,  frequency, type, date, center_cost_id, category_id}: ExpenseTypes): Promise<Expenses | Error>{

    const expense = ExpenseRepository().create({
      description,
      amount,
      quantity,
      frequency,
      type,
      date,
      center_cost_id,
      category_id
    });

    if(!await CategoryRepository().findOne({id: category_id})){
      return new Error ("Category does not exists!")
    }
    if(!await CenterCostRepository().findOne({id: center_cost_id})){
      return new Error ("Center cost does not exists!")

    }

    await ExpenseRepository().save(expense)

    return expense
    
  }
}
