import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { CreateCategory } from "../contracts/create-category"
import { ICategoryRepository } from "../repositories/icategory-repository"

@injectable()
export class CreateCategoryUseCase  {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ){}

  async execute({ name }: CreateCategory.Params): Promise<CreateCategory.Result>  {
    const validate = this.validate(name)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }

    const category = await this.categoryRepository.findByName(name)

    if(category){
      return left(new AppError("Categoria já existe!"))
    }
    const result = await this.categoryRepository.add({ name })
    return right(result)    
  }
  
  validate(name: string): Either<string, null> {
    if (!name) {
      return left("Param is required: name")
    }
    return right(null)
  }
}
