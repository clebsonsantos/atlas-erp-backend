import { GetAllCenterCostController } from "@/presentation/controllers/center-cost"
import { makeListCentersCost } from "@/main/factories/usecases/center-cost"

export const makeListCenterCostController = (): GetAllCenterCostController => {
  return new GetAllCenterCostController(makeListCentersCost())
}