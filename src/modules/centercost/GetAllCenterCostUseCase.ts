import { CenterCostRepository } from '../../repositories';
import { CentersCost } from "./infra/typeorm/entities/center-cost";



export class GetAllCenterCostUseCase  {

  async execute(): Promise< CentersCost[]> {

    const centersCost = CenterCostRepository().find({order: {
      created_at: "DESC"
    }})

    return centersCost
    
  }
}
