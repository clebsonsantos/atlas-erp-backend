import { CategoryRepository } from "@/domain/contracts/repositories"
import { DeleteCategory } from "@/domain/contracts/usecases"
import { Failure, RelationshipError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class DeleteCategoryUseCase implements DeleteCategory {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute({ id }: DeleteCategory.Input): Promise<DeleteCategory.Output>{
    const category = await this.categoryRepository.findById(id)
    if(!category){
      return left(new Failure("Category does not exists"))
    }
    const deleteCategory = await this.categoryRepository.delete(id)
    if(!deleteCategory){
      return left(new RelationshipError())
    }
    return right("Success")
  }
}
