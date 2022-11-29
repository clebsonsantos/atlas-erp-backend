import { FindAllOrFilterCustomersController } from "@/presentation/controllers/customer"
import { makeListCustomerOrFilter } from "@/main/factories/usecases/customer"

export const makeListCustomerController = (): FindAllOrFilterCustomersController => {
  return new FindAllOrFilterCustomersController(makeListCustomerOrFilter())
}