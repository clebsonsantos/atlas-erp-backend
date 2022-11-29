import { CreateCustomerUseCase } from "@/domain/usecases/customer"
import { makeDocumentValidator } from "@/main/factories/gateways"
import { makeCustomerRepository } from "@/main/factories/repositories"

export const makeCreateCustomer = (): CreateCustomerUseCase => {
  return new CreateCustomerUseCase(
    makeCustomerRepository(),
    makeDocumentValidator()
  )
}