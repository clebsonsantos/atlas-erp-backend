import { ListCentersCostUseCase } from "@/domain/usecases/center-cost"
import { makeCenterCostRepository } from "@/main/factories/repositories"

export const makeListCentersCost = (): ListCentersCostUseCase => {
  return new ListCentersCostUseCase(makeCenterCostRepository())
}