import { DeleteCategoryUseCase } from "@/domain/usecases/category"
import { makeCategoryRepository } from "@/main/factories/repositories"

export const makeDeleteCategoryController = (): DeleteCategoryUseCase => {
  return new DeleteCategoryUseCase(makeCategoryRepository())
}