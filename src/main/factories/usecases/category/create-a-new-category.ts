import { CreateCategoryUseCase } from "@/domain/usecases/category/create-a-new-category"
import { makeCategoryRepository } from "@/main/factories/repositories"

export const makeCreateCategory = (): CreateCategoryUseCase => {
  return new CreateCategoryUseCase(makeCategoryRepository())
}