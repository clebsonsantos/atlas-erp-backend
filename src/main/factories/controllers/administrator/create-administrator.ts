import { CreateAdministratorController } from "@/presentation/controllers/administrator/create-administrator-company"
import { makeCreateAdministrator } from "@/main/factories/usecases/administrator/create-administrator"

export const makeCreateAdministratorController = () => {
  return new CreateAdministratorController(makeCreateAdministrator())
}