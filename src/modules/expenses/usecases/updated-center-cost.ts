import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { UpdatedCenterCost } from "../contracts/updated-center-cost"
import { ICenterCostRepository } from "../repositories/icenter-cost-repository"

@injectable()
export class UpdateCenterCostUseCase {
  constructor(
    @inject("CenterCostRepository")
    private readonly centerCostRepository: ICenterCostRepository
  ){}

  async execute({ id, name }: UpdatedCenterCost.Params): Promise<UpdatedCenterCost.Result> {

    const centerCost = await this.centerCostRepository.findById(id)

    if(!centerCost){
      return left(new AppError("Centro de custo não existe", 404))
    }

    centerCost.name = name ? name : centerCost.name

    const centerCostSave = await this.centerCostRepository.update(centerCost)

    return right(centerCostSave)
    
  }
}
