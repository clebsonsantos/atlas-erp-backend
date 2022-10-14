import { Router } from "express"
import { CreatePermissionController } from "@/modules/permissions/controllers/create-permission"
import { can, ensuredAuthenticated } from "../middlewares"
import { GetAllPermissionsController } from "@/modules/permissions/controllers/get-all-permissions"

const permissionRoutes = Router()

permissionRoutes.post(
  "/insert",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreatePermissionController().handle
)

permissionRoutes.get('/list', ensuredAuthenticated(), new GetAllPermissionsController().handle)

export { permissionRoutes }