import { CentersCost } from '../../entities/CentersCost';
import { CenterCostRepository } from '../../repositories';



export class GetAllCenterCostUseCase  {

  async execute(): Promise< CentersCost[]> {

    const centersCost = CenterCostRepository().find({order: {
      created_at: "DESC"
    }})

    return centersCost
    
  }
}
