import { UpdateCenterCostUseCase } from "@/domain/usecases/center-cost"
import { makeCenterCostRepository } from "@/main/factories/repositories"

export const makeUpdateCenterCost = (): UpdateCenterCostUseCase => {
  return new UpdateCenterCostUseCase(makeCenterCostRepository())
}