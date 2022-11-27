import { DeleteExpenseUseCase } from "@/domain/usecases/expense"
import { makeExpenseRepository } from "@/main/factories/repositories"

export const makeDeleteExpense = (): DeleteExpenseUseCase => {
  return new DeleteExpenseUseCase(makeExpenseRepository())
}