import { Router } from "express"
import { CreateExpensesController } from "@/modules/expenses/controllers/create-expense"
import { ListExpensesController } from "@/modules/expenses/controllers/list-expenses"
import { UpdateExpensesController } from "@/modules/expenses/controllers/updated-expense"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"
import { DeleteExpenseController } from "@/modules/expenses/controllers/delete-expense"

const expenseRoutes = Router()

expenseRoutes.post("/",
  ensuredAuthenticated(),
  can(["admin",
  'expenses']),
  new CreateExpensesController().handle
)

expenseRoutes.get("/",
  ensuredAuthenticated(),
  can(["admin",
  'expenses']),
  new ListExpensesController().handle
)

expenseRoutes.put("/:id",
  ensuredAuthenticated(),
  can(["admin",
  'expenses']),
  ensuredValidateUUID(),
  new UpdateExpensesController().handle
)

expenseRoutes.delete("/:id",
  ensuredAuthenticated(),
  can(["admin",
  'expenses']),
  ensuredValidateUUID(),
  new DeleteExpenseController().handle
)


export { expenseRoutes }