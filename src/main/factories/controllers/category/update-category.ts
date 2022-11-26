import { UpdateCategoryController } from "@/presentation/controllers/category"
import { makeUpdateCategory } from "@/main/factories/usecases/category"

export const makeUpdateCategoryController = (): UpdateCategoryController => {
  return new UpdateCategoryController(makeUpdateCategory())
}