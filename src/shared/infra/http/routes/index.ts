import { Router } from "express";
import { customerRoutes } from "./customer.routes";

const routes = Router();



import { ensuredValidateUUID, ensuredAuthReports, ensuredAuthenticated, can } from '../middlewares';
import { GetAllPermissionsController } from '@/controllers/permissions/GetAllPermissionsController';
import { GetSalesOrderController } from '@/controllers/reports/GetSalesOrderController';
import { CreatePermissionController } from "@/controllers/permissions/CreatePermissionController";
import { CreateProductController } from "@/controllers/products/CreateProductController";
import { CreateRoleController } from "@/controllers/roles/CreateRoleController";
import { CreateRolePermissionController } from "@/controllers/roles/CreateRolePermissionController";
import { CreateUserAccessControlListController } from "@/controllers/user/CreateUserAccessControlListController";
import { GetAllProductsController } from "@/controllers/products/GetAllProductsController";
import { SessionController } from "@/controllers/authentication/SessionController";

import { CreateExpensesController } from '@/controllers/expenses/CreateExpensesController';
import { CreateCategoryController } from '@/controllers/categories/CreateCategoryController';
import { CreateCenterCostController } from '@/controllers/centercost/CreateCenterCostController';
import { GetAllCategoryController } from '@/controllers/categories/GetAllCategoryController';
import { GetAllExpensesController } from '@/controllers/expenses/GetAllExpensesController';
import { GetAllCenterCostController } from '@/controllers/centercost/GetAllCenterCostController';
import { UpdateExpensesController } from '@/controllers/expenses/UpdateExpensesController';
import { DeleteExpenseController } from '@/controllers/expenses/DeleteExpenseController';
import { UpdateCategoryController } from '@/controllers/categories/UpdateCategoryController';
import { DeleteCategoryController } from '@/controllers/categories/DeleteCategoryController';
import { UpdateCenterCostController } from '@/controllers/centercost/UpdateCenterCostController';
import { DeleteCenterCostController } from '@/controllers/centercost/DeleteCenterCostController';
import { CreateAdministratorController } from '@/controllers/administrator/CreateAdministratorController';
import { UpdateAdministratorController } from '@/controllers/administrator/UpdateAdministratorController';
import { GetAdministratorController } from '@/controllers/administrator/GetAdministratorController';
import { GetAllUsersController } from '@/controllers/user/GetAllUsersController';
import { UpdateInformationsUserController } from '@/controllers/user/UpdateInformationsUserController';
import { UpdateProductController } from '@/controllers/products/UpdateProductController';
import { DeleteProductController } from '@/controllers/products/DeleteProductController';
import { CreateSaleProductsSoldController } from '@/controllers/sales/CreateSaleProductsSoldController';
import { GettAllSaleProductsController } from '@/controllers/sales/GettAllSaleProductsController';
import { DeleteSaleProductsController } from '@/controllers/sales/DeleteSaleProductsController';
import { UpdateSaleProductsController } from '@/controllers/sales/UpdateSaleProductsController';
import { FindOneUserController } from '@/controllers/user/FindOneUserController';
import { GetReportsController } from '@/controllers/reports/GetReportsController';

// Inserindo um arquivo de imagem
import multer from 'multer'
import { CreateUserController } from "@/modules/user/controllers/create-user";
import { DeleteUserController } from "@/modules/user/controllers/delete-user";
const storage = multer.diskStorage({
  destination: function(res, file, cb){
    cb(null, './uploads');
    
  },
  filename: function(req, file, cb) {
    cb(null, "company_logo.png")
    
  }
})
const upload = multer({storage})
// Fim

// Customers
routes.use("/customers", customerRoutes);

// Usuários e Login
routes.post("/users", ensuredAuthenticated(), can(["admin"]), new CreateUserController().handle);
routes.get("/users",  ensuredAuthenticated(), new GetAllUsersController().handle);
routes.post("/find_user",  ensuredAuthenticated(), new FindOneUserController().handle);
routes.put("/users/:id", ensuredAuthenticated(), ensuredValidateUUID(), new UpdateInformationsUserController().handle);
routes.delete("/users/:id", ensuredAuthenticated(), can(["admin"]), ensuredValidateUUID(), new DeleteUserController().handle);

routes.post("/login", new SessionController().handle);               


routes.post(
  "/roles",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreateRoleController().handle
);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreatePermissionController().handle
);
routes.get('/permissions', ensuredAuthenticated(), new GetAllPermissionsController().handle)

routes.post(
  "/users/acl/:userId",
  ensuredAuthenticated(),
  can(["admin"]),
  ensuredValidateUUID(),
  new CreateUserAccessControlListController().handle
);

routes.post("/roles/:roleId",   
  ensuredAuthenticated(),
  can(["admin"]),
  ensuredValidateUUID(),
  new CreateRolePermissionController().handle
);

// Despesas/ganhos
routes.post("/expenses", ensuredAuthenticated(), can(["admin", 'expenses']), new CreateExpensesController().handle)
routes.get("/expenses", ensuredAuthenticated(), can(["admin", 'expenses']), new GetAllExpensesController().handle)
routes.put("/expenses/:id", ensuredAuthenticated(), can(["admin", 'expenses']), ensuredValidateUUID(), new UpdateExpensesController().handle)
routes.delete("/expenses/:id", ensuredAuthenticated(), can(["admin", 'expenses']), ensuredValidateUUID(), new DeleteExpenseController().handle)

// Categorias
routes.post("/categories", ensuredAuthenticated(), can(["admin", 'categories']), new CreateCategoryController().handle)
routes.get("/categories", ensuredAuthenticated(), can(["admin", 'categories']), new GetAllCategoryController().handle)
routes.put("/categories/:id", ensuredAuthenticated(), can(["admin", 'categories']), ensuredValidateUUID(), new UpdateCategoryController().handle)
routes.delete("/categories/:id", ensuredAuthenticated(), can(["admin", 'categories']), ensuredValidateUUID(), new DeleteCategoryController().handle)

// Centro de custo
routes.post("/center_cost", ensuredAuthenticated(), can(["admin", 'center_cost']), new CreateCenterCostController().handle)
routes.get("/center_cost", ensuredAuthenticated(), can(["admin", 'center_cost']), new GetAllCenterCostController().handle)
routes.put("/center_cost/:id", ensuredAuthenticated(), can(["admin", 'center_cost']), ensuredValidateUUID(), new UpdateCenterCostController().handle)
routes.delete("/center_cost/:id", ensuredAuthenticated(), can(["admin", 'center_cost']), ensuredValidateUUID(), new DeleteCenterCostController().handle)

//Administrador
routes.post("/create_admin", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), new CreateAdministratorController().handle)
routes.put("/update_admin/:id", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), ensuredValidateUUID(), new UpdateAdministratorController().handle)
routes.get("/get_admin", ensuredAuthenticated(), can(["admin"]), new GetAdministratorController().handle)


// Produtos
routes.get("/products", ensuredAuthenticated(), can(["admin", 'products']), new GetAllProductsController().handle);
// routes.post("/products/search", ensuredAuthenticated(), can(["admin", 'products']), new GetAllProductsController().handle);
routes.post("/products", ensuredAuthenticated(), can(["admin", 'products']), new CreateProductController().handle);
routes.put("/products/:id", ensuredAuthenticated(), can(["admin", 'products']), ensuredValidateUUID(),new UpdateProductController().handle);
routes.delete("/products/:id", ensuredAuthenticated(), can(["admin", 'products']), ensuredValidateUUID(), new DeleteProductController().handle);

// Pedidos/Vendas 
routes.post("/sales", ensuredAuthenticated(), can(["admin", 'sales']), new CreateSaleProductsSoldController().handle);
routes.get("/sales", ensuredAuthenticated(), can(["admin", 'sales']), new GettAllSaleProductsController().handle);
routes.delete("/sales/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new DeleteSaleProductsController().handle);
routes.put("/sales/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new UpdateSaleProductsController().handle);

// Relatórios
routes.get("/reports", ensuredAuthReports(), can(["admin", 'reports']), new GetReportsController().handle);
routes.get("/salesorder/:id", ensuredAuthReports(), can(["admin", 'reports']), ensuredValidateUUID(), new GetSalesOrderController().handle);

export { routes };
