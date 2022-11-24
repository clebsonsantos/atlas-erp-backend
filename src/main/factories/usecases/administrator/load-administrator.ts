import { LoadAdministratorCompany } from "@/domain/usecases/administrator"
import { makeAdministratorRepository } from "@/main/factories/repositories/administrator"

export const makeLoadAdministrator = () => {
  return new LoadAdministratorCompany(makeAdministratorRepository())
}