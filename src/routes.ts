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
  can(["create_product", "list_product"]),
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

export { routes };
