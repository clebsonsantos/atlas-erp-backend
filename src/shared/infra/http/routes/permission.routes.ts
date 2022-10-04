import { Router } from "express"
import { CreatePermissionController } from "@/modules/permissions/controllers/create-permission"
import { can, ensuredAuthenticated } from "../middlewares"


const permissionRoutes = Router()

permissionRoutes.post(
  "/permissions",
  ensuredAuthenticated(),
  can(["admin"]),
  new CreatePermissionController().handle
)

export { permissionRoutes }