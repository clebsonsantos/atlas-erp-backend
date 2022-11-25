import { UpdateAdministratorController } from "@/presentation/controllers/administrator"
import { makeUpdateAdministratorService } from "@/main/factories/usecases/administrator"

export const makeUpdateAdministratorController = (): UpdateAdministratorController => {
  return new UpdateAdministratorController(makeUpdateAdministratorService())
}