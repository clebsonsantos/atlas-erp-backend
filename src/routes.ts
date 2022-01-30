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

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new SessionController().handle);

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

// Despesas
routes.post("/expenses", ensuredAuthenticated(), new CreateExpensesController().handle)
routes.get("/expenses", ensuredAuthenticated(), new GetAllExpensesController().handle)
routes.put("/expenses/:id", ensuredAuthenticated(), new UpdateExpensesController().handle)
routes.delete("/expenses/:id", ensuredAuthenticated(), new DeleteExpenseController().handle)

//Categorias
routes.post("/category", ensuredAuthenticated(), new CreateCategoryController().handle)
routes.get("/categories", ensuredAuthenticated(), new GetAllCategoryController().handle)
routes.put("/categories/:id", ensuredAuthenticated(), new UpdateCategoryController().handle)

// Criar Centro de custo
routes.post("/center_cost", ensuredAuthenticated(), new CreateCenterCostController().handle)
routes.get("/center_cost", ensuredAuthenticated(), new GetAllCenterCostController().handle)

export { routes };
