import { ExpenseRepositoryImpl } from "@/infra/database/repositories"

export const makeExpenseRepository = (): ExpenseRepositoryImpl => {
  return new ExpenseRepositoryImpl()
}