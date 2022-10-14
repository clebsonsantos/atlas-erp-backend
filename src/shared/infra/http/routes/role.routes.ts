import { CreateRoleController } from "@/modules/permissions/controllers/create-role" 
import { CreateRolePermissionController } from "@/modules/permissions/controllers/create-role-permission" 
import { Router } from "express" 
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"

const roleRoutes = Router()

roleRoutes.post(
  "/insert-role-permission/:roleId",
  ensuredAuthenticated(),
  can(["admin"]),
  ensuredValidateUUID(),
  new CreateRolePermissionController().handle
)

roleRoutes.post(
  "/insert",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreateRoleController().handle
)

export { roleRoutes }
