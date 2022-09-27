import { CategoryRepository } from '../../repositories';

type Type = {
  id: string;
  name: string
}


export class UpdateCategoryUseCase  {

  async execute({id, name}: Type){
    const category = await CategoryRepository().findOne({id})

    if(!category){
      return new Error("Categoria não existe.");
    }

    category.name = name ? name : category.name

    CategoryRepository().save(category)

    return category


    
  }
}
