import { Router } from 'express'
import { adaptExpressRoute as adapt } from "@/main/adapters"
import {
  makeCreateCustomerController,
  makeDeleteCustomerController,
  makeListCustomerController,
  makeUpdateCustomerController
} from "@/main/factories/controllers/customer"

export default (router: Router): void => {
  router.post("/customer/new", adapt(makeCreateCustomerController()))
  router.get("/customer/list", adapt(makeListCustomerController()))
  router.delete("/customer/delete/:id", adapt(makeDeleteCustomerController()))
  router.put("/customer/update/:id", adapt(makeUpdateCustomerController()))
}
