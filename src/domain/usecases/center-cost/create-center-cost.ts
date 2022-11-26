import { CenterCostRepository } from "@/domain/contracts/repositories"
import { CreateCenterCost } from "@/domain/contracts/usecases"
import { AlreadyExists, InvalidFieldError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class CreateCenterCostUseCase implements CreateCenterCost {
  constructor(
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute({ name }: CreateCenterCost.Input): Promise<CreateCenterCost.Output>  {
    if (!name) {
      return left(new InvalidFieldError("name"))
    }
    const findCenter = await this.centerCostRepository.findByName(name)
    if(findCenter){
      return left(new AlreadyExists("Center Cost"))
    }
    const centerCost = await this.centerCostRepository.add({ name })
    return right(centerCost)
  }
}
