import { Router } from "express"
import { CreatePermissionController } from "@/modules/permissions/controllers/create-permission"
import { can, ensuredAuthenticated } from "../middlewares"
import { GetAllPermissionsController } from "@/modules/permissions/controllers/get-all-permissions"

const permissionRoutes = Router()

permissionRoutes.post(
  "/",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreatePermissionController().handle
)

permissionRoutes.get('/', ensuredAuthenticated(), new GetAllPermissionsController().handle)

export { permissionRoutes }