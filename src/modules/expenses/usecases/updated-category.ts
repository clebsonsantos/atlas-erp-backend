import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { UpdatedCategory } from "../contracts/updated-category"
import { ICategoryRepository } from "../repositories/icategory-repository"


@injectable()
export class UpdateCategoryUseCase  {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ){}

  async execute({ id, name }: UpdatedCategory.Params): Promise<UpdatedCategory.Result> {
    const category = await this.categoryRepository.findById(id)
    if(!category){
      return left(new AppError("Categoria não existe.", 404))
    }
    category.name = name ? name : category.name

    const result = await this.categoryRepository.update(category)
    return right(result)
  }
}
