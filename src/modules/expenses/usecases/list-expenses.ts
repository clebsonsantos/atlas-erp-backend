import { inject, injectable } from "tsyringe"
import { Expenses } from "../infra/typeorm/entities/expense"
import { IExpenseRepository } from "../repositories/iexpense-repository"

@injectable()
export class ListExpensesUseCase  {
  constructor(
    @inject("ExpenseRepository")
    private readonly expenseRepository: IExpenseRepository
  ) {}

  async execute(): Promise<Expenses[]> {
    const expenses = await this.expenseRepository.list()
    return expenses
  }
}
