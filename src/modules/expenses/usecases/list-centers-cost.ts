import { inject, injectable } from "tsyringe" 
import { CentersCost } from "../infra/typeorm/entities/center-cost" 
import { ICenterCostRepository } from "../repositories/icenter-cost-repository" 


@injectable()
export class ListCentersCostUseCase {
  constructor(
    @inject("CenterCostRepository")
    private readonly centerCostRepository: ICenterCostRepository
  ){}

  async execute(): Promise< CentersCost[]> {
    const centersCost = await this.centerCostRepository.list()
    return centersCost
  }
}
