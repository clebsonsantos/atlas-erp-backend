import { CreatePermissionUseCase } from "@/modules/permissions/CreatePermissionUseCase"
import { permissions } from "@/utils/permissions"

async function DefaultPermissionsSystem() {
  for await(const permission of permissions){
    await (new CreatePermissionUseCase()).execute({name: permission.name, description: permission.descripion})
  }
  return true
}

export { DefaultPermissionsSystem }