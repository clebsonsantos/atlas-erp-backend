import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import { 
  makeCreateCategoryController,
  makeLoadCategoriesController,
  makeDeleteCategoryController,
  makeUpdateCategoryController
} from "@/main/factories/controllers/category"

export default (router: Router): void => {
  router.post("/category/new", adapt(makeCreateCategoryController()))
  router.get("/category/list", adapt(makeLoadCategoriesController()))
  router.delete("/category/delete/:id", adapt(makeDeleteCategoryController()))
  router.put("/category/update/:id", adapt(makeUpdateCategoryController()))
}
