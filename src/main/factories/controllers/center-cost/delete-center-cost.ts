import { DeleteCenterCostController } from "@/presentation/controllers/center-cost"
import { makeDeleteCenterCostById } from "@/main/factories/usecases/center-cost"

export const makeDeleteCenterCostController = (): DeleteCenterCostController => {
  return new DeleteCenterCostController(makeDeleteCenterCostById())
}