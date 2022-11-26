import { ListCategoriesUseCase } from "@/domain/usecases/category"
import { makeCategoryRepository } from "@/main/factories/repositories"

export const makeListCategories = (): ListCategoriesUseCase => {
  return new ListCategoriesUseCase(makeCategoryRepository())
}