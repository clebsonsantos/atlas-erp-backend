import { CreateAdministratorController } from "@/presentation/controllers/administrator"
import { makeCreateAdministrator } from "@/main/factories/usecases/administrator"

export const makeCreateAdministratorController = () => {
  return new CreateAdministratorController(makeCreateAdministrator())
}