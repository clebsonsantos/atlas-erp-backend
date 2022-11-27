import { ListExpensesUseCase } from "@/domain/usecases/expense"
import { makeExpenseRepository } from "@/main/factories/repositories"

export const makeListExpenses = (): ListExpensesUseCase => {
  return new ListExpensesUseCase(makeExpenseRepository())
}