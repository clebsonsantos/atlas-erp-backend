import { CreateExpensesController } from "@/presentation/controllers/expense"
import { makeCreateExpense } from "@/main/factories/usecases/expense"

export const makeCreateExpenseController = (): CreateExpensesController => {
  return new CreateExpensesController(makeCreateExpense())
}