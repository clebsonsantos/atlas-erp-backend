import { CategoryRepository } from "@/domain/contracts/repositories"
import { LoadCategories } from "@/domain/contracts/usecases"
import { Category } from "@/domain/entities"

export class ListCategoriesUseCase implements LoadCategories {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()
    return categories
  }
}
