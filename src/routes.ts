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

// Criar despesas
routes.post("/expenses", ensuredAuthenticated(), new CreateExpensesController().handle)

//Categorias
routes.post("/category", ensuredAuthenticated(), new CreateCategoryController().handle)
routes.get("/categories", ensuredAuthenticated(), new GetAllCategoryController().handle)

// Criar Centro de custo
routes.post("/center_cost", ensuredAuthenticated(), new CreateCenterCostController().handle)

export { routes };
