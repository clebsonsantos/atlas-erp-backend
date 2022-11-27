import { UpdateExpensesUseCase } from "@/domain/usecases/expense"
import { makeExpenseRepository } from "@/main/factories/repositories"

export const makeUpdateExpense = (): UpdateExpensesUseCase => {
  return new UpdateExpensesUseCase(makeExpenseRepository())
}