import { CategoryRepository } from '../../repositories';
import { Category } from "./infra/typeorm/entities/category";

type CategoryType = {
  name: string
}


export class CreateCategoryUseCase  {

  async execute({name}: CategoryType): Promise< Category | Error>  {

    const category = CategoryRepository().create({
      name
    })
    if(await CategoryRepository().findOne({name})){
      return new Error("Categoria já existe!")
    }
    await CategoryRepository().save(category)

    return category
    
  }
}
