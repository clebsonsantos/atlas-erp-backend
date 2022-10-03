import { CategoryRepository, CenterCostRepository, ExpenseRepository } from '../../repositories';
import { Expenses } from "./infra/typeorm/entities/expense";

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

    if(!await CenterCostRepository().findOne({id: center_cost_id})){
      return new Error ("Centro de custo não existe!")

    }
    if(!await CategoryRepository().findOne({id: category_id})){
      return new Error ("Categoria não existe!")
    }

    await ExpenseRepository().save(expense)

    return expense
    
  }
}
