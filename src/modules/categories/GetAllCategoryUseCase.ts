import { CategoryRepository } from '../../repositories';
import { Category } from "./infra/typeorm/entities/category";

export class GetAllCategoryUseCase  {

  async execute(): Promise< Category[]> {
    const categories = await CategoryRepository().find({order: {
      created_at: "DESC"
    }})
    return categories
  
  }
}
