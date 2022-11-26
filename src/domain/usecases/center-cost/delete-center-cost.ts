import { CenterCostRepository } from "@/domain/contracts/repositories"
import { DeleteCenterCost } from "@/domain/contracts/usecases"
import { Failure, RelationshipError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class DeleteCenterCostUseCase implements DeleteCenterCost {
  constructor(
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute({ id }: DeleteCenterCost.Input): Promise<DeleteCenterCost.Output> {
    const center_cost = await this.centerCostRepository.findById(id)
    if(!center_cost){
      return left(new Failure("Center cost does not exists"))
    }
    const result = await this.centerCostRepository.delete(id)
    if(!result){
      return left(new RelationshipError())
    }
    return right("Success")
  }
}
