import { CenterCostRepository } from '../../repositories';
import { CentersCost } from "./infra/typeorm/entities/center-cost";

type CategoryType = {
  name: string
}


export class CreateCenterCostUseCase  {

  async execute({name}: CategoryType): Promise< CentersCost | Error>  {

    const category = CenterCostRepository().create({
      name
    })
    if(await CenterCostRepository().findOne({name})){
      return new Error("Centro de custo já existe!")
    }
    await CenterCostRepository().save(category)

    return category
    
  }
}


 