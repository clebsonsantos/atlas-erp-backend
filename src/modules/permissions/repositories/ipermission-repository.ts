import { CreatePermission } from "../contracts/create-permission"
import { Permission } from "../infra/typeorm/entities/permission"

export interface IPermissionRepository {
  getAll(): Promise<Permission[]>
  add(data: CreatePermission.Params) : Promise<Permission>
}