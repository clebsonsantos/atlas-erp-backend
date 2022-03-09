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

// Inserindo um arquivo de imagem
import multer from 'multer'
import { GetAllUsersController } from './controllers/user/GetAllUsersController';
import { UpdateInformationsUserController } from './controllers/user/UpdateInformationsUserController';
import { DeleteUserController } from './controllers/user/DeleteUserController';
import { CreateCustomerController } from './controllers/customers/CreateCustomerController';
import { GetAllCustomersController } from './controllers/customers/GetAllCustomersController';
import { UpdateCustomerController } from './controllers/customers/UpdateCustomerController';
import { DeleteCustomerController } from './controllers/customers/DeleteCustomerController';
import { UpdateProductController } from './controllers/products/UpdateProductController';
import { DeleteProductController } from './controllers/products/DeleteProductController';
const storage = multer.diskStorage({
  destination: function(res, file, cb){
    cb(null, './uploads');

  },
  filename: function(req, file, cb) {
    cb(null, "storage_image_"+file.originalname)
    
  }
})
const upload = multer({storage})
// Fim


const routes = Router();

// Usuários e Login
routes.post("/users", new CreateUserController().handle);
routes.get("/users",  ensuredAuthenticated(), new GetAllUsersController().handle);
routes.put("/users/:id",  ensuredAuthenticated(), new UpdateInformationsUserController().handle);
routes.delete("/users/:id",  
  ensuredAuthenticated(), 
  is(["admin"]),
  new DeleteUserController().handle
);

routes.post("/login", new SessionController().handle);               


// Produtos
routes.get("/products",
  ensuredAuthenticated(),
  new GetAllProductsController().handle 
);

routes.post(
  "/products",
  ensuredAuthenticated(),
  is(["admin"]), // can(["create_product", "list_product"]) ||
  new CreateProductController().handle
);
routes.put("/products/:id", ensuredAuthenticated(), new UpdateProductController().handle);
routes.delete("/products/:id", ensuredAuthenticated(), new DeleteProductController().handle);

routes.post(
  "/roles",
  ensuredAuthenticated(),
  is(["admin"]),
  new CreateRoleController().handle
);

routes.post(
  "/permissions",
  ensuredAuthenticated(),
  new CreatePermissionController().handle
);

routes.post(
  "/users/acl",
  ensuredAuthenticated(),
  new CreateUserAccessControlListController().handle
);

routes.post("/roles/:roleId", new CreateRolePermissionController().handle);

// Despesas/ganhos
routes.post("/expenses", ensuredAuthenticated(), new CreateExpensesController().handle)
routes.get("/expenses", ensuredAuthenticated(), new GetAllExpensesController().handle)
routes.put("/expenses/:id", ensuredAuthenticated(), new UpdateExpensesController().handle)
routes.delete("/expenses/:id", ensuredAuthenticated(), new DeleteExpenseController().handle)

// Categorias
routes.post("/categories", ensuredAuthenticated(), new CreateCategoryController().handle)
routes.get("/categories", ensuredAuthenticated(), new GetAllCategoryController().handle)
routes.put("/categories/:id", ensuredAuthenticated(), new UpdateCategoryController().handle)
routes.delete("/categories/:id", ensuredAuthenticated(), new DeleteCategoryController().handle)

// Centro de custo
routes.post("/center_cost", ensuredAuthenticated(), new CreateCenterCostController().handle)
routes.get("/center_cost", ensuredAuthenticated(), new GetAllCenterCostController().handle)
routes.put("/center_cost/:id", ensuredAuthenticated(), new UpdateCenterCostController().handle)
routes.delete("/center_cost/:id", ensuredAuthenticated(), new DeleteCenterCostController().handle)

//Administrador
routes.post("/create_admin", ensuredAuthenticated(), upload.single('url_image'), new CreateAdministratorController().handle)
routes.put("/update_admin/:id", ensuredAuthenticated(), upload.single('url_image'), new UpdateAdministratorController().handle)
routes.get("/get_admin", ensuredAuthenticated(), new GetAdministratorController().handle)

//Clientes
routes.post("/customers", ensuredAuthenticated(), new CreateCustomerController().handle)
routes.get("/customers", ensuredAuthenticated(), new GetAllCustomersController().handle)
routes.put("/customers/:id", ensuredAuthenticated(), new UpdateCustomerController().handle)
routes.delete("/customers/:id", ensuredAuthenticated(), new DeleteCustomerController().handle)

export { routes };
