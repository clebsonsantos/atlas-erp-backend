import { GetAllCategoryController } from "@/presentation/controllers/category"
import { makeListCategories } from "@/main/factories/usecases/category"

export const makeLoadCategoriesController = (): GetAllCategoryController => {
  return new GetAllCategoryController(makeListCategories())
} 