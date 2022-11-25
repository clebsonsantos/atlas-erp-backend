import { container } from "tsyringe"
import { CreatePermissionUseCase } from "@/modules/permissions/usecases/create-permission"
import { permissions } from "@/utils/permissions"
// TODO ! Refactoring
async function DefaultPermissionsSystem() {
  for await(const permission of permissions){
    const createPermissionService = container.resolve(CreatePermissionUseCase)
    await createPermissionService.execute({ name: permission.name, description: permission.descripion})
  }
  return true
}

export { DefaultPermissionsSystem }