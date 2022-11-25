import { CategoryRepositoryImpl } from "@/infra/database/repositories"

export const makeCategoryRepository = (): CategoryRepositoryImpl => {
  return new CategoryRepositoryImpl()
}