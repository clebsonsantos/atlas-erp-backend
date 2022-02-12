import { Category } from '../../entities/Category';
import { CategoryRepository } from '../../repositories';

export class GetAllCategoryUseCase  {

  async execute(): Promise< Category[]> {
    const categories = await CategoryRepository().find({order: {
      created_at: "DESC"
    }})
    return categories
  
  }
}
