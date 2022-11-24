import { LoadAdministratorCompanyController } from "@/presentation/controllers/administrator/load-administrator-company"
import { makeLoadAdministrator } from "@/main/factories/usecases/administrator/load-administrator"

export const makeLoadAdministratorController = () => {
  return new LoadAdministratorCompanyController(makeLoadAdministrator())
}