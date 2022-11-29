import { UpdateCustomerUseCase } from "@/domain/usecases/customer"
import { makeCustomerRepository } from "@/main/factories/repositories"

export const makeUpdateCustomer = (): UpdateCustomerUseCase => {
  return new UpdateCustomerUseCase(
    makeCustomerRepository()
  )
}