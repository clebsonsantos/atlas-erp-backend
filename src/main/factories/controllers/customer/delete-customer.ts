import { DeleteCustomerController } from "@/presentation/controllers/customer"
import { makeDeleteCustomer } from "@/main/factories/usecases/customer"

export const makeDeleteCustomerController = (): DeleteCustomerController => {
  return new DeleteCustomerController(makeDeleteCustomer())
}