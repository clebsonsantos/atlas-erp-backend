import { PermissionRepository } from '../../repositories/index';
import { Permission } from '../../entities/Permission'

export class GetAllPermissionsUseCase  {

  async execute(): Promise<Permission[]> {
   const permissions =  await PermissionRepository().find()
   return permissions
    
  }
}
