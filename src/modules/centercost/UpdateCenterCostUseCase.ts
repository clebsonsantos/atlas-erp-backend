import { CenterCostRepository } from '../../repositories';
import { CentersCost } from "./infra/typeorm/entities/center-cost";

type Type = {
  id: string;
  name: string
}


export class UpdateCenterCostUseCase  {

  async execute({ id, name }: Type): Promise<CentersCost | Error> {

    const center_cost = await CenterCostRepository().findOne({ id })

    if(!center_cost){
      return new Error("Centro de custo não existe");
    }

    center_cost.name = name ? name : center_cost.name

    await CenterCostRepository().save(center_cost)

    return center_cost


    
  }
}
