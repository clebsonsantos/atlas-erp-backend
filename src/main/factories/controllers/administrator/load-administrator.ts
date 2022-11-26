import { LoadAdministratorCompanyController } from "@/presentation/controllers/administrator"
import { makeLoadAdministrator } from "@/main/factories/usecases/administrator"

export const makeLoadAdministratorController = (): LoadAdministratorCompanyController => {
  return new LoadAdministratorCompanyController(makeLoadAdministrator())
}