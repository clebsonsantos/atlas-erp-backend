import { Router } from "express"
import { customerRoutes } from "./customer.routes"
import { userRoutes } from "./user.routes"
import { permissionRoutes } from "./permission.routes"
import { roleRoutes } from "./role.routes"
import { expenseRoutes } from "./expense.routes"
import { productRoutes } from "./product.routes"
import { saleRoutes } from "./sale.routes"
import { administratorRoutes } from "./adminitrator.routes"
import { reportsRoutes } from "./reports.routes"
import { CreateSessionLoginController } from "@/modules/user/controllers/create-session-login"

const routes = Router()

routes.use("/customers", customerRoutes)
routes.use("/users", userRoutes)
routes.post("/login", new CreateSessionLoginController().handle)               

routes.use("/permissions", permissionRoutes)
routes.use("/roles", roleRoutes)
routes.use("/expenses", expenseRoutes)
routes.use("/products", productRoutes)
routes.use("/sales", saleRoutes)
routes.use("/admin", administratorRoutes)
routes.use("/report", reportsRoutes)

export { routes }
