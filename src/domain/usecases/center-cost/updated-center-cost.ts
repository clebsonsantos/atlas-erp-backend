import { CenterCostRepository } from "@/domain/contracts/repositories"
import { UpdatedCenterCost } from "@/domain/contracts/usecases"
import { Failure } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class UpdateCenterCostUseCase implements UpdatedCenterCost {
  constructor(
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute({ id, name }: UpdatedCenterCost.Input): Promise<UpdatedCenterCost.Output> {
    const centerCost = await this.centerCostRepository.findById(id)
    if(!centerCost){
      return left(new Failure("Center cost does not exists"))
    }
    centerCost.name = name ? name : centerCost.name
    const centerCostSave = await this.centerCostRepository.update(centerCost)
    return right(centerCostSave)
  }
}
