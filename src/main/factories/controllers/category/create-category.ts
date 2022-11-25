import { CreateANewCategoryController } from "@/presentation/controllers/category"
import { makeCreateCategory } from "@/main/factories/usecases/category"

export const makeCreateCategoryController = (): CreateANewCategoryController => {
  return new CreateANewCategoryController(makeCreateCategory())
}