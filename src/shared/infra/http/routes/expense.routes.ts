import { DeleteExpenseController } from "@/controllers/expenses/DeleteExpenseController"
import { GetAllExpensesController } from "@/controllers/expenses/GetAllExpensesController"
import { UpdateExpensesController } from "@/controllers/expenses/UpdateExpensesController"
import { CreateExpensesController } from "@/modules/expenses/controllers/create-expense"
import { Router } from "express"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"

const expenseRoutes = Router()

expenseRoutes.post("/", ensuredAuthenticated(), can(["admin", 'expenses']), new CreateExpensesController().handle)
expenseRoutes.get("/", ensuredAuthenticated(), can(["admin", 'expenses']), new GetAllExpensesController().handle)
expenseRoutes.put("/:id", ensuredAuthenticated(), can(["admin", 'expenses']), ensuredValidateUUID(), new UpdateExpensesController().handle)
expenseRoutes.delete("/:id", ensuredAuthenticated(), can(["admin", 'expenses']), ensuredValidateUUID(), new DeleteExpenseController().handle)


export { expenseRoutes }