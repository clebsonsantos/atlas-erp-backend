import { UpdateCustomerController } from "@/presentation/controllers/customer"
import { makeUpdateCustomer } from "@/main/factories/usecases/customer"

export const makeUpdateCustomerController = (): UpdateCustomerController => {
  return new UpdateCustomerController(makeUpdateCustomer())
}