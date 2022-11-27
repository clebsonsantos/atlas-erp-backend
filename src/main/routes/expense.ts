import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import {
  makeCreateExpenseController,
  makeDeleteExpenseController,
  makeListExpensesController,
  makeUpdateExpenseController
} from "@/main/factories/controllers/expense"

export default (router: Router): void => {
  router.post("/expense/new", adapt(makeCreateExpenseController()))
  router.get("/expense/list", adapt(makeListExpensesController()))
  router.delete("/expense/delete/:id", adapt(makeDeleteExpenseController()))
  router.put("/expense/update/:id", adapt(makeUpdateExpenseController()))
}
