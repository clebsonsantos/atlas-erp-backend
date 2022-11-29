import { DeleteCustomerUseCase } from "@/domain/usecases/customer"
import { makeCustomerRepository } from "@/main/factories/repositories"

export const makeDeleteCustomer = (): DeleteCustomerUseCase => {
  return new DeleteCustomerUseCase(
    makeCustomerRepository()
  )
}