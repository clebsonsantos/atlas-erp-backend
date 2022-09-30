import { PermissionRepository } from '../../repositories/index';
import { Permission } from "./infra/typeorm/entities/permission";

export class GetAllPermissionsUseCase  {

  async execute(): Promise<Permission[]> {
   const permissions =  await PermissionRepository().find()
   return permissions
    
  }
}
