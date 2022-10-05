import { inject, injectable } from "tsyringe";
import { Category } from "../infra/typeorm/entities/category";
import { ICategoryRepository } from "../repositories/icategory-repository";

@injectable()
export class ListCategoriesUseCase  {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ){}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list()
    return categories
  }
}
