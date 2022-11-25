import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import { makeCreateCategoryController } from "@/main/factories/controllers/category"

export default (router: Router): void => {
  router.post("/category/new", adapt(makeCreateCategoryController()))
  router.use(router)
}
