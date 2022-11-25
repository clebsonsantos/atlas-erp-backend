import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import { makeCreateAdministratorController, makeLoadAdministratorController, makeUpdateAdministratorController } from "@/main/factories/controllers/administrator"

export default (router: Router): void => {
  router.post("/admin/new", adapt(makeCreateAdministratorController()))
  router.get("/admin/load", adapt(makeLoadAdministratorController()))
  router.put("/admin/update/:id", adapt(makeUpdateAdministratorController()))
  router.use(router)
}
