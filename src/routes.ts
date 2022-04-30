import { GetAllPermissionsController } from './controllers/permissions/GetAllPermissionsController';
import { GetSalesOrderController } from './controllers/reports/GetSalesOrderController';
import { Router } from "express";
import { CreatePermissionController } from "./controllers/permissions/CreatePermissionController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import { CreateRoleController } from "./controllers/roles/CreateRoleController";
import { CreateRolePermissionController } from "./controllers/roles/CreateRolePermissionController";
import { CreateUserAccessControlListController } from "./controllers/user/CreateUserAccessControlListController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { GetAllProductsController } from "./controllers/products/GetAllProductsController";
import { SessionController } from "./controllers/authentication/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { can, is } from "./middleware/permissions";
import { CreateExpensesController } from './controllers/expenses/CreateExpensesController';
import { CreateCategoryController } from './controllers/categories/CreateCategoryController';
import { CreateCenterCostController } from './controllers/centercost/CreateCenterCostController';
import { GetAllCategoryController } from './controllers/categories/GetAllCategoryController';
import { GetAllExpensesController } from './controllers/expenses/GetAllExpensesController';
import { GetAllCenterCostController } from './controllers/centercost/GetAllCenterCostController';
import { UpdateExpensesController } from './controllers/expenses/UpdateExpensesController';
import { DeleteExpenseController } from './controllers/expenses/DeleteExpenseController';
import { UpdateCategoryController } from './controllers/categories/UpdateCategoryController';
import { DeleteCategoryController } from './controllers/categories/DeleteCategoryController';
import { UpdateCenterCostController } from './controllers/centercost/UpdateCenterCostController';
import { DeleteCenterCostController } from './controllers/centercost/DeleteCenterCostController';
import { CreateAdministratorController } from './controllers/administrator/CreateAdministratorController';
import { UpdateAdministratorController } from './controllers/administrator/UpdateAdministratorController';
import { GetAdministratorController } from './controllers/administrator/GetAdministratorController';
import { GetAllUsersController } from './controllers/user/GetAllUsersController';
import { UpdateInformationsUserController } from './controllers/user/UpdateInformationsUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { CreateCustomerController } from './controllers/customers/CreateCustomerController';
import { GetAllCustomersController } from './controllers/customers/GetAllCustomersController';
import { UpdateCustomerController } from './controllers/customers/UpdateCustomerController';
import { DeleteCustomerController } from './controllers/customers/DeleteCustomerController';
import { UpdateProductController } from './controllers/products/UpdateProductController';
import { DeleteProductController } from './controllers/products/DeleteProductController';
import { CreateSaleProductsSoldController } from './controllers/sales/CreateSaleProductsSoldController';
import { GettAllSaleProductsController } from './controllers/sales/GettAllSaleProductsController';
import { DeleteSaleProductsController } from './controllers/sales/DeleteSaleProductsController';
import { UpdateSaleProductsController } from './controllers/sales/UpdateSaleProductsController';
import { FindOneUserController } from './controllers/user/FindOneUserController';
import { GetReportsController } from './controllers/reports/GetReportsController';
import { ensuredAuthReports } from './middleware/ensuredAuthReports';

// Inserindo um arquivo de imagem
import multer from 'multer'
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


const routes = Router();

// Usuários e Login
routes.post("/users", ensuredAuthenticated(), can(["admin"]), new CreateUserController().handle);
routes.get("/users",  ensuredAuthenticated(), new GetAllUsersController().handle);
routes.post("/find_user",  ensuredAuthenticated(), new FindOneUserController().handle);
routes.put("/users/:id", ensuredAuthenticated(), new UpdateInformationsUserController().handle);
routes.delete("/users/:id", ensuredAuthenticated(), can(["admin"]), new DeleteUserController().handle);

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
  new CreateUserAccessControlListController().handle
);

routes.post("/roles/:roleId",   
  ensuredAuthenticated(),
  can(["admin"]),
  new CreateRolePermissionController().handle
);

// Despesas/ganhos
routes.post("/expenses", ensuredAuthenticated(), can(["admin", 'expenses']), new CreateExpensesController().handle)
routes.get("/expenses", ensuredAuthenticated(), can(["admin", 'expenses']), new GetAllExpensesController().handle)
routes.put("/expenses/:id", ensuredAuthenticated(), can(["admin", 'expenses']), new UpdateExpensesController().handle)
routes.delete("/expenses/:id", ensuredAuthenticated(), can(["admin", 'expenses']), new DeleteExpenseController().handle)

// Categorias
routes.post("/categories", ensuredAuthenticated(), can(["admin", 'categories']), new CreateCategoryController().handle)
routes.get("/categories", ensuredAuthenticated(), can(["admin", 'categories']), new GetAllCategoryController().handle)
routes.put("/categories/:id", ensuredAuthenticated(), can(["admin", 'categories']), new UpdateCategoryController().handle)
routes.delete("/categories/:id", ensuredAuthenticated(), can(["admin", 'categories']), new DeleteCategoryController().handle)

// Centro de custo
routes.post("/center_cost", ensuredAuthenticated(), can(["admin", 'center_cost']), new CreateCenterCostController().handle)
routes.get("/center_cost", ensuredAuthenticated(), can(["admin", 'center_cost']), new GetAllCenterCostController().handle)
routes.put("/center_cost/:id", ensuredAuthenticated(), can(["admin", 'center_cost']), new UpdateCenterCostController().handle)
routes.delete("/center_cost/:id", ensuredAuthenticated(), can(["admin", 'center_cost']), new DeleteCenterCostController().handle)

//Administrador
routes.post("/create_admin", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), new CreateAdministratorController().handle)
routes.put("/update_admin/:id", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), new UpdateAdministratorController().handle)
routes.get("/get_admin", ensuredAuthenticated(), can(["admin"]), new GetAdministratorController().handle)

//Clientes
routes.post("/customers", ensuredAuthenticated(), can(["admin", 'customers']), new CreateCustomerController().handle)
routes.get("/customers", ensuredAuthenticated(), can(["admin", 'customers']), new GetAllCustomersController().handle)
routes.post("/customers/search", ensuredAuthenticated(), can(["admin", 'customers']), new GetAllCustomersController().handle)
routes.put("/customers/:id", ensuredAuthenticated(), can(["admin", 'customers']), new UpdateCustomerController().handle)
routes.delete("/customers/:id", ensuredAuthenticated(), can(["admin", 'customers']), new DeleteCustomerController().handle)

// Produtos
routes.get("/products", ensuredAuthenticated(), can(["admin", 'products']), new GetAllProductsController().handle);
routes.post("/products/search", ensuredAuthenticated(), can(["admin", 'products']), new GetAllProductsController().handle);
routes.post("/products", ensuredAuthenticated(), can(["admin", 'products']), new CreateProductController().handle);
routes.put("/products/:id", ensuredAuthenticated(), can(["admin", 'products']), new UpdateProductController().handle);
routes.delete("/products/:id", ensuredAuthenticated(), can(["admin", 'products']), new DeleteProductController().handle);

// Pedidos/Vendas 
routes.post("/sales", ensuredAuthenticated(), can(["admin", 'sales']), new CreateSaleProductsSoldController().handle);
routes.get("/sales", ensuredAuthenticated(), can(["admin", 'sales']), new GettAllSaleProductsController().handle);
routes.delete("/sales/:id", ensuredAuthenticated(), can(["admin", 'sales']), new DeleteSaleProductsController().handle);
routes.put("/sales/:id", ensuredAuthenticated(), can(["admin", 'sales']), new UpdateSaleProductsController().handle);

// Relatórios
routes.get("/reports", ensuredAuthReports(), can(["admin", 'reports']), new GetReportsController().handle);
routes.get("/salesorder/:id", ensuredAuthReports(), can(["admin", 'reports']), new GetSalesOrderController().handle);

export { routes };
