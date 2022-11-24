import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import { makeCreateAdministratorController } from "@/main/factories/controllers/administrator/create-administrator"
import { makeLoadAdministratorController } from "@/main/factories/controllers/administrator/load-administrator"

export default (router: Router): void => {
  router.post("/admin/new", adapt(makeCreateAdministratorController()))
  router.get("/admin/load", adapt(makeLoadAdministratorController()))
  router.use(router)
}
