import { LoadAdministratorCompany } from "@/domain/usecases/administrator/load-administrator-company"
import { makeAdministratorRepository } from "@/main/factories/repositories/administrator"

export const makeLoadAdministrator = () => {
  return new LoadAdministratorCompany(makeAdministratorRepository())
}