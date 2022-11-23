import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import { makeCreateAdministratorController } from "@/main/factories/controllers/administrator/create-administrator"

export default (router: Router): void => {
  router.post("/admin/new", adapt(makeCreateAdministratorController()))
  router.use(router)
}
