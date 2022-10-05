import { Router } from "express"
import { CreateExpensesController } from "@/modules/expenses/controllers/create-expense"
import { ListExpensesController } from "@/modules/expenses/controllers/list-expenses"
import { UpdateExpensesController } from "@/modules/expenses/controllers/updated-expense"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"
import { DeleteExpenseController } from "@/modules/expenses/controllers/delete-expense"
import { CreateCategoryController } from "@/modules/expenses/controllers/create-category"
import { GetAllCategoryController } from "@/modules/expenses/controllers/list-categories"
import { UpdateCategoryController } from "@/modules/expenses/controllers/updated-category"
import { DeleteCategoryController } from "@/modules/expenses/controllers/delete-category"
import { CreateCenterCostController } from "@/modules/expenses/controllers/create-center-cost"
import { GetAllCenterCostController } from "@/modules/expenses/controllers/list-centers-cost"
import { UpdateCenterCostController } from "@/modules/expenses/controllers/updated-center-cost"
import { DeleteCenterCostController } from "@/modules/expenses/controllers/delete-cente-cost"

const expenseRoutes = Router()

expenseRoutes.post("/",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  new CreateExpensesController().handle
)

expenseRoutes.get("/",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  new ListExpensesController().handle
)

expenseRoutes.put("/:id",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  ensuredValidateUUID(),
  new UpdateExpensesController().handle
)

expenseRoutes.delete("/:id",
  ensuredAuthenticated(),
  can(["admin", "expenses"]),
  ensuredValidateUUID(),
  new DeleteExpenseController().handle
)

// Categories
expenseRoutes.post("/category",
  ensuredAuthenticated(),
  can(["admin", "categories"]),
  new CreateCategoryController().handle
)
expenseRoutes.get("/categories/list",
  ensuredAuthenticated(),
  can(["admin", "categories"]),
  new GetAllCategoryController().handle
)
expenseRoutes.put("/category/:id",
  ensuredAuthenticated(),
  can(["admin", "categories"]),
  ensuredValidateUUID(),
  new UpdateCategoryController().handle
)
expenseRoutes.delete("/category/:id",
  ensuredAuthenticated(),
  can(["admin", "categories"]),
  ensuredValidateUUID(),
  new DeleteCategoryController().handle
)

// Centers Cost
expenseRoutes.post("/center_cost",
  ensuredAuthenticated(),
  can(["admin", "center_cost"]),
  new CreateCenterCostController().handle
)
expenseRoutes.get("/centers_cost/list",
  ensuredAuthenticated(),
  can(["admin", "center_cost"]),
  new GetAllCenterCostController().handle
)
expenseRoutes.put("/center_cost/:id",
  ensuredAuthenticated(),
  can(["admin", "center_cost"]),
  ensuredValidateUUID(),
  new UpdateCenterCostController().handle
)
expenseRoutes.delete("/center_cost/:id",
  ensuredAuthenticated(),
  can(["admin", "center_cost"]),
  ensuredValidateUUID(),
  new DeleteCenterCostController().handle
)

export { expenseRoutes }