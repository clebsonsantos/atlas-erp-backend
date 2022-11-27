import { UpdateCenterCostController } from "@/presentation/controllers/center-cost"
import { makeUpdateCenterCost } from "@/main/factories/usecases/center-cost"

export const makeUpdateCenterCostController = (): UpdateCenterCostController => {
  return new UpdateCenterCostController(makeUpdateCenterCost())
}