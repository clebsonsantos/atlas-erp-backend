import { ExpenseRepository } from "@/domain/contracts/repositories"
import { ListExpenses } from "@/domain/contracts/usecases/expense"
import { ExpenseDTO } from "@/domain/entities"

export class ListExpensesUseCase implements ListExpenses {
  constructor(
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(): Promise<ExpenseDTO[]> {
    const expenses = await this.expenseRepository.list()
    return expenses
  }
}
