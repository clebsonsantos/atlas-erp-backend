import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import { makeCreateCategoryController, makeDeleteCategoryController, makeLoadCategoriesController, makeUpdateCategoryController } from "@/main/factories/controllers/category"

export default (router: Router): void => {
  router.post("/category/new", adapt(makeCreateCategoryController()))
  router.get("/category/list", adapt(makeLoadCategoriesController()))
  router.put("/category/update/:id", adapt(makeUpdateCategoryController()))
  router.delete("/category/delete/:id", adapt(makeDeleteCategoryController()))
  router.use(router)
}
