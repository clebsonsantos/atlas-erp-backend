import { ListExpensesController } from "@/presentation/controllers/expense"
import { makeListExpenses } from "@/main/factories/usecases/expense"

export const makeListExpensesController = (): ListExpensesController => {
  return new ListExpensesController(makeListExpenses())
}