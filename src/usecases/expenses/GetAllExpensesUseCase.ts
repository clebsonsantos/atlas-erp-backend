
import { Expenses } from '../../entities/Expenses';
import { ExpenseRepository } from "../../repositories";


export class GetAllExpensesUseCase  {

  async execute(): Promise< Expenses[]> {
    const expenses = await ExpenseRepository().find({
      relations: ["category", "center_cost"]
    })
    return expenses
  }
}
