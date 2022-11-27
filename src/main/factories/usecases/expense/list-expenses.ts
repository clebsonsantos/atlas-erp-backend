import { ListExpensesUseCase } from "@/domain/usecases/expense"
import { makeExpenseRepository } from "@/main/factories/repositories"

export const makeListExpenses = () => {
  return new ListExpensesUseCase(makeExpenseRepository())
}