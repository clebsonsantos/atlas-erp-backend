import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { DeleteCenterCost } from "../contracts/delete-center-cost"
import { ICenterCostRepository } from "../repositories/icenter-cost-repository"


@injectable()
export class DeleteCenterCostUseCase  {
  constructor(
    @inject("CenterCostRepository")
    private readonly centerCostRepository: ICenterCostRepository
  ){}

  async execute({ id }: DeleteCenterCost.Params): Promise<DeleteCenterCost.Result> {

    const center_cost = await this.centerCostRepository.findById(id)

    if(!center_cost){
      return left(new AppError("Centro de custo não existe"))
    }
    const result = await this.centerCostRepository.delete(id)

    if(!result){
      return left(new AppError("Não é possível deletar esse registro.\nVerifique os relacionamentos que dependem dele."))
    }

    return right("Centro de custo deletado com sucesso.")
    
  }
}
