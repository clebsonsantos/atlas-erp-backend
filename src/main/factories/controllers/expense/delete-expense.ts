import { DeleteExpenseController } from "@/presentation/controllers/expense"
import { makeDeleteExpense } from "@/main/factories/usecases/expense"

export const makeDeleteExpenseController = (): DeleteExpenseController => {
  return new DeleteExpenseController(makeDeleteExpense())
}