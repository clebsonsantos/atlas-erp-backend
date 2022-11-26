import { CenterCostRepository } from "@/domain/contracts/repositories"
import { LoadCenterCost } from "@/domain/contracts/usecases"

export class ListCentersCostUseCase implements LoadCenterCost {
  constructor(
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute(): Promise<LoadCenterCost.Output> {
    const centersCost = await this.centerCostRepository.list()
    return centersCost
  }
}
