import { CreateCustomerController } from "@/presentation/controllers/customer"
import { makeCreateCustomer } from "@/main/factories/usecases/customer"

export const makeCreateCustomerController = (): CreateCustomerController => {
  return new CreateCustomerController(makeCreateCustomer())
}