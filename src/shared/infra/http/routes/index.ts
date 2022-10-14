import { Router } from "express"
import { customerRoutes } from "./customer.routes"
import { userRoutes } from "./user.routes"
import { permissionRoutes } from "./permission.routes"
import { roleRoutes } from "./role.routes"
import { expenseRoutes } from "./expense.routes"

const routes = Router()

import { ensuredValidateUUID, ensuredAuthReports, ensuredAuthenticated, can } from '../middlewares'
import { GetSalesOrderController } from '@/controllers/reports/GetSalesOrderController'
import { GetReportsController } from '@/controllers/reports/GetReportsController'

// Inserindo um arquivo de imagem
import { CreateSessionLoginController } from "@/modules/user/controllers/create-session-login"
import { productRoutes } from "./product.routes"
import { saleRoutes } from "./sale.routes"
import { administratorRoutes } from "./adminitrator.routes"

// Fim

// ?? Rotas refatoradas.
routes.use("/customers", customerRoutes)
routes.use("/users", userRoutes)
routes.post("/login", new CreateSessionLoginController().handle)               

routes.use("/permissions", permissionRoutes)
routes.use("/roles", roleRoutes)
routes.use("/expenses", expenseRoutes)
routes.use("/products", productRoutes)
routes.use("/sales", saleRoutes)
routes.use("/admin", administratorRoutes)
//?? Fim de rotas refatoradas




// Relatórios
routes.get("/reports", ensuredAuthReports(), can(["admin", 'reports']), new GetReportsController().handle)
routes.get("/salesorder/:id", ensuredAuthReports(), can(["admin", 'reports']), ensuredValidateUUID(), new GetSalesOrderController().handle)

export { routes }
