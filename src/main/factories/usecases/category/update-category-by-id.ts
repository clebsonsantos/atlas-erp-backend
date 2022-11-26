import { UpdateCategoryUseCase } from "@/domain/usecases/category"
import { makeCategoryRepository } from "@/main/factories/repositories"

export const makeUpdateCategory = (): UpdateCategoryUseCase=> {
  return new UpdateCategoryUseCase(makeCategoryRepository())
}