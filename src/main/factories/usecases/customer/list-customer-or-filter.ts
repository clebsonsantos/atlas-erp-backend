import { FindAllCustomersUseCase } from "@/domain/usecases/customer"
import { makeCustomerRepository } from "@/main/factories/repositories"

export const makeListCustomerOrFilter = (): FindAllCustomersUseCase => {
  return new FindAllCustomersUseCase(
    makeCustomerRepository()
  )
}