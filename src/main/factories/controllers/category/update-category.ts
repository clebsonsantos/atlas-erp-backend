import { UpdateCategoryUseCase } from "@/domain/usecases/category"
import { makeCategoryRepository } from "@/main/factories/repositories"

export const makeUpdateCategoryController = (): UpdateCategoryUseCase => {
  return new UpdateCategoryUseCase(makeCategoryRepository())
}