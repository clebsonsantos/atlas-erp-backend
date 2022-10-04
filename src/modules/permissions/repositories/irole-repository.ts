import { Role } from "../infra/typeorm/entities/role"

export interface IRoleRepository {
  findOne(id: string): Promise<Role>
  add(data: Role): Promise<Role>
}