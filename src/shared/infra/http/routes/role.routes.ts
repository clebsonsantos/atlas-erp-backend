import { CreateRoleController } from "@/modules/permissions/controllers/create-role" 
import { CreateRolePermissionController } from "@/modules/permissions/controllers/create-role-permission" 
import { Router } from "express" 
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"

const roleRoutes = Router()

roleRoutes.post(
  "/:roleId",
  ensuredAuthenticated(),
  can(["admin"]),
  ensuredValidateUUID(),
  new CreateRolePermissionController().handle
)

roleRoutes.post(
  "/",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreateRoleController().handle
)

export { roleRoutes }
