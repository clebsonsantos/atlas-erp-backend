import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { CreateCenterCost } from "../contracts/create-center-cost"
import { ICenterCostRepository } from "../repositories/icenter-cost-repository"


@injectable()
export class CreateCenterCostUseCase {
  constructor(
    @inject("CenterCostRepository")
    private readonly centerCostRepository: ICenterCostRepository
  ){}

  async execute({ name }: CreateCenterCost.Params): Promise<CreateCenterCost.Result>  {
    const validate = this.validate(name)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }
    
    const findCenter = await this.centerCostRepository.findByName(name)
    if(findCenter){
      return left(new AppError("Centro de custo já existe!"))
    }
    
    const centerCost = await this.centerCostRepository.add({ name })
    return right(centerCost)
  }

  validate(name: string): Either<string, null> {
    if (!name) {
      return left("Param is required: name")
    }
    return right(null)
  }
}


 