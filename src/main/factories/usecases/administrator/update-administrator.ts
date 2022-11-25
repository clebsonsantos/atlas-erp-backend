import { UpdateAdministratorCompany } from "@/domain/usecases/administrator"
import { makeDocumentValidator } from "@/main/factories/gateways"
import { makeAdministratorRepository } from "@/main/factories/repositories/administrator"

export const makeUpdateAdministratorService = (): UpdateAdministratorCompany => {
  return new UpdateAdministratorCompany(
    makeAdministratorRepository(),
    makeDocumentValidator()
  )
}