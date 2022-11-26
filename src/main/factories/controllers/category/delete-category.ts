import { DeleteCategoryController } from "@/presentation/controllers/category"
import { makeDeleteCategoryById } from "@/main/factories/usecases/category"

export const makeDeleteCategoryController = (): DeleteCategoryController => {
  return new DeleteCategoryController(makeDeleteCategoryById())
}