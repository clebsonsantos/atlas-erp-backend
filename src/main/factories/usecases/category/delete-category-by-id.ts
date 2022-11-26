import { DeleteCategoryUseCase } from "@/domain/usecases/category"
import { makeCategoryRepository } from "@/main/factories/repositories"

export const makeDeleteCategoryById = (): DeleteCategoryUseCase => {
  return new DeleteCategoryUseCase(makeCategoryRepository())
}