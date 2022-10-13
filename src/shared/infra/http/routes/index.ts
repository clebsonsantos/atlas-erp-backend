import { Router } from "express"
import { customerRoutes } from "./customer.routes"
import { userRoutes } from "./user.routes"
import { permissionRoutes } from "./permission.routes"
import { roleRoutes } from "./role.routes"
import { expenseRoutes } from "./expense.routes"

const routes = Router()

import { ensuredValidateUUID, ensuredAuthReports, ensuredAuthenticated, can } from '../middlewares'
import { GetSalesOrderController } from '@/controllers/reports/GetSalesOrderController'
import { CreateAdministratorController } from '@/controllers/administrator/CreateAdministratorController'
import { UpdateAdministratorController } from '@/controllers/administrator/UpdateAdministratorController'
import { GetAdministratorController } from '@/controllers/administrator/GetAdministratorController'
import { CreateSaleProductsSoldController } from '@/controllers/sales/CreateSaleProductsSoldController'
import { GettAllSaleProductsController } from '@/controllers/sales/GettAllSaleProductsController'
import { DeleteSaleProductsController } from '@/controllers/sales/DeleteSaleProductsController'
import { UpdateSaleProductsController } from '@/controllers/sales/UpdateSaleProductsController'
import { GetReportsController } from '@/controllers/reports/GetReportsController'

// Inserindo um arquivo de imagem
import multer from 'multer'
import { CreateSessionLoginController } from "@/modules/user/controllers/create-session-login"
import { productRoutes } from "./produc.routes"
const storage = multer.diskStorage({
  destination: function(res, file, cb){
    cb(null, './uploads')
    
  },
  filename: function(req, file, cb) {
    cb(null, "company_logo.png")
    
  }
})
const upload = multer({storage})
// Fim

// ?? Rotas refatoradas.
routes.use("/customers", customerRoutes)
routes.use("/users", userRoutes)
routes.post("/login", new CreateSessionLoginController().handle)               

routes.use("/permissions", permissionRoutes)
routes.use("/roles", roleRoutes)
routes.use("/expenses", expenseRoutes)
routes.use("/products", productRoutes)
//?? Fim de rotas refatoradas


//Administrador
routes.post("/create_admin", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), new CreateAdministratorController().handle)
routes.put("/update_admin/:id", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), ensuredValidateUUID(), new UpdateAdministratorController().handle)
routes.get("/get_admin", ensuredAuthenticated(), can(["admin"]), new GetAdministratorController().handle)

// Pedidos/Vendas 
routes.post("/sales", ensuredAuthenticated(), can(["admin", 'sales']), new CreateSaleProductsSoldController().handle)
routes.get("/sales", ensuredAuthenticated(), can(["admin", 'sales']), new GettAllSaleProductsController().handle)
routes.delete("/sales/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new DeleteSaleProductsController().handle)
routes.put("/sales/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new UpdateSaleProductsController().handle)

// Relatórios
routes.get("/reports", ensuredAuthReports(), can(["admin", 'reports']), new GetReportsController().handle)
routes.get("/salesorder/:id", ensuredAuthReports(), can(["admin", 'reports']), ensuredValidateUUID(), new GetSalesOrderController().handle)

export { routes }
