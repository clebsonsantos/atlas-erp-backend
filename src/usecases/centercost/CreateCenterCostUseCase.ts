import { CentersCost } from '../../entities/CentersCost';
import { CenterCostRepository } from '../../repositories';

type CategoryType = {
  name: string
}


export class CreateCenterCostUseCase  {

  async execute({name}: CategoryType): Promise< CentersCost | Error>  {

    const category = CenterCostRepository().create({
      name
    })
    if(await CenterCostRepository().findOne({name})){
      return new Error("Center cost already exist!")
    }
    await CenterCostRepository().save(category)

    return category
    
  }
}


 