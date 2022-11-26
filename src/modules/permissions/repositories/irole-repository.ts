import { CreateRole } from "../contracts/create-role"
import { Role } from "../infra/typeorm/entities/role"

export interface IRoleRepository {
  findOne(id: string): Promise<Role>
  addPermission(data: Role): Promise<Role>
  findByName(name: string): Promise<Role>
  add(data: CreateRole.Input): Promise<Role>
  findByIds(ids: string[]): Promise<Role[]>
}