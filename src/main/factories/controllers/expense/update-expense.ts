import { UpdateExpensesController } from "@/presentation/controllers/expense"
import { makeUpdateExpense } from "@/main/factories/usecases/expense"

export const makeUpdateExpenseController = (): UpdateExpensesController=> {
  return new UpdateExpensesController(makeUpdateExpense())
}