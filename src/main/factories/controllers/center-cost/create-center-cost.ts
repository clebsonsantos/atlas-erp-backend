import { CreateCenterCostController } from "@/presentation/controllers/center-cost"
import { makeCreateCenterCost } from "@/main/factories/usecases/center-cost"

export const makeCreateCenterCostController = (): CreateCenterCostController => {
  return new CreateCenterCostController(makeCreateCenterCost())
}