import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { DeleteCategory } from "../contracts/delete-category"
import { ICategoryRepository } from "../repositories/icategory-repository"


@injectable()
export class DeleteCategoryUseCase  {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ){}

  async execute({ id }: DeleteCategory.Input): Promise<DeleteCategory.Output>{
    const category = await this.categoryRepository.findById(id)

    if(!category){
      return left(new AppError("Categoria não existe!", 404))

    }
    const deleteCategory = await this.categoryRepository.delete(id)

    if(!deleteCategory){
      return left(new AppError("Não é possível deletar esse registro.\nVerifique se há relacionamentos que dependem dele."))
    }

    return right("Categoria deletada com sucesso.")
    
  }
}
