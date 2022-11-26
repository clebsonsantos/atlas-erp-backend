import { CategoryRepository } from "@/domain/contracts/repositories"
import { UpdatedCategory } from "@/domain/contracts/usecases"
import { Failure } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class UpdateCategoryUseCase implements UpdatedCategory {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute({ id, name }: UpdatedCategory.Input): Promise<UpdatedCategory.Output> {
    const category = await this.categoryRepository.findById(id)
    if(!category){
      return left(new Failure("Category does not exists"))
    }
    category.name = name ? name : category.name
    const result = await this.categoryRepository.update(category)
    return right(result)
  }
}
