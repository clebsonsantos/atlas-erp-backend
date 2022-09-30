
import { ExpenseRepository } from "../../repositories";
import { Expenses } from "./infra/typeorm/entities/expense";


export class GetAllExpensesUseCase  {

  async execute(): Promise< Expenses[]> {
    const expenses = await ExpenseRepository().find({
      relations: ["category", "center_cost"]
    })
    return expenses
  }
}
