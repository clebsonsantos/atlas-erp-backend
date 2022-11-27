import { CreateExpenseUseCase } from "@/domain/usecases/expense"
import { makeCategoryRepository, makeCenterCostRepository, makeExpenseRepository } from "@/main/factories/repositories"

export const makeCreateExpense = (): CreateExpenseUseCase => {
  return new CreateExpenseUseCase(
    makeExpenseRepository(),
    makeCenterCostRepository(),
    makeCategoryRepository()
  )
}