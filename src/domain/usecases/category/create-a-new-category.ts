import { CategoryRepository } from "@/domain/contracts/repositories"
import { CreateCategory } from "@/domain/contracts/usecases/category"
import { Category } from "@/domain/entities"
import { AlreadyExists, InvalidFieldError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class CreateCategoryUseCase implements CreateCategory {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute({ name }: CreateCategory.Params): Promise<CreateCategory.Result>  {
    if (!name) {
      return left(new InvalidFieldError("name"))
    }
    const exists = await this.categoryRepository.findByName(name)
    if(exists){
      return left(new AlreadyExists("Category"))
    }
    const category = new Category(name)
    category.setIdAndDate("any", new Date())

    const result = await this.categoryRepository.add(category)
    return right(result)    
  }
}
