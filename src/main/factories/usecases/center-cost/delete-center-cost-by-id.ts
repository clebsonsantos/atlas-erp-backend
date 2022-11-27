import { DeleteCenterCostUseCase } from "@/domain/usecases/center-cost/delete-center-cost"
import { makeCenterCostRepository } from "@/main/factories/repositories"

export const makeDeleteCenterCostById = (): DeleteCenterCostUseCase => {
  return new DeleteCenterCostUseCase(makeCenterCostRepository())
}