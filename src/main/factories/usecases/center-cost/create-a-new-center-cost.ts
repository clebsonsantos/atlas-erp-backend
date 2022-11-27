import { CreateCenterCostUseCase } from "@/domain/usecases/center-cost"
import { makeCenterCostRepository } from "@/main/factories/repositories"

export const makeCreateCenterCost = (): CreateCenterCostUseCase => {
  return new CreateCenterCostUseCase(makeCenterCostRepository())
}