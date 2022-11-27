import { Router } from "express"
import { CreateExpensesController } from "@/modules/expenses/controllers/create-expense"
import { ListExpensesController } from "@/modules/expenses/controllers/list-expenses"
import { UpdateExpensesController } from "@/modules/expenses/controllers/updated-expense"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"
import { DeleteExpenseController } from "@/modules/expenses/controllers/delete-expense"
const expenseRoutes = Router()

expenseRoutes.post("/insert",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  new CreateExpensesController().handle
)

expenseRoutes.get("/list",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  new ListExpensesController().handle
)

expenseRoutes.put("/update/:id",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  ensuredValidateUUID(),
  new UpdateExpensesController().handle
)

expenseRoutes.delete("/delete/:id",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  ensuredValidateUUID(),
  new DeleteExpenseController().handle
)

// Categories
// expenseRoutes.post("/category/insert",
//   ensuredAuthenticated(),
//   can(["admin", "categories"]),
//   new CreateCategoryController().handle
// )
// expenseRoutes.get("/category/list",
//   ensuredAuthenticated(),
//   can(["admin", "categories"]),
//   new GetAllCategoryController().handle
// )
// expenseRoutes.put("/category/update/:id",
//   ensuredAuthenticated(),
//   can(["admin", "categories"]),
//   ensuredValidateUUID(),
//   new UpdateCategoryController().handle
// )
// expenseRoutes.delete("/category/delete/:id",
//   ensuredAuthenticated(),
//   can(["admin", "categories"]),
//   ensuredValidateUUID(),
//   new DeleteCategoryController().handle
// )

// Centers Cost
// expenseRoutes.post("/center_cost/insert",
//   ensuredAuthenticated(),
//   can(["admin", "center_cost"]),
//   new CreateCenterCostController().handle
// )
// expenseRoutes.get("/center_cost/list",
//   ensuredAuthenticated(),
//   can(["admin", "center_cost"]),
//   new GetAllCenterCostController().handle
// )
// expenseRoutes.put("/center_cost/update/:id",
//   ensuredAuthenticated(),
//   can(["admin", "center_cost"]),
//   ensuredValidateUUID(),
//   new UpdateCenterCostController().handle
// )
// expenseRoutes.delete("/center_cost/delete/:id",
//   ensuredAuthenticated(),
//   can(["admin", "center_cost"]),
//   ensuredValidateUUID(),
//   new DeleteCenterCostController().handle
// )

export { expenseRoutes }