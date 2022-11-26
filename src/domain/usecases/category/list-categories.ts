import { CategoryRepository } from "@/domain/contracts/repositories"
import { LoadCategories } from "@/domain/contracts/usecases"
import { CategoryDTO } from "@/domain/entities"

export class ListCategoriesUseCase implements LoadCategories {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute(): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.list()
    return categories
  }
}
