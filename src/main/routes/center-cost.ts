import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import {
  makeCreateCenterCostController,
  makeDeleteCenterCostController,
  makeListCenterCostController,
  makeUpdateCenterCostController
} from "@/main/factories/controllers/center-cost"


export default (router: Router): void => {
  router.post("/centerCost/new", adapt(makeCreateCenterCostController()))
  router.get("/centerCost/list", adapt(makeListCenterCostController()))
  router.delete("/centerCost/delete/:id", adapt(makeDeleteCenterCostController()))
  router.put("/centerCost/update/:id", adapt(makeUpdateCenterCostController()))
}
