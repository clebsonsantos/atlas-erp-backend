import { CreateAdministratorCompany } from "@/domain/usecases/administrator"
import { makeAdministratorRepository } from "@/main/factories/repositories/administrator"
import { makeDocumentValidator } from "@/main/factories/gateways/cpf-cnpj"

export const makeCreateAdministrator = (): CreateAdministratorCompany => {
  return new CreateAdministratorCompany(
    makeAdministratorRepository(),
    makeDocumentValidator()
  )
}