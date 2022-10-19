import { IRoleRepository } from "@/modules/permissions/repositories/irole-repository" 
import { Role } from "@/modules/permissions/infra/typeorm/entities/role" 
import { getRepository, Repository } from "typeorm" 
import { CreateRole } from "@/modules/permissions/contracts/create-role" 


export class RoleRepository implements IRoleRepository {
  
  private repository: Repository<Role>
  constructor(){
    this.repository = getRepository(Role)
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.repository.findOne({ id })
    return role
  }
  
  async addPermission(data: Role): Promise<Role> {
    const role = this.repository.create(data)
    const roleSave = await this.repository.save(role)
    return roleSave
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.repository.findOne({ name })
    return role
  }

  async add(data: CreateRole.Params): Promise<Role> {
      const role = this.repository.create(data)
      const roleSave = await this.repository.save(role)
      return roleSave
  }
  async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.repository.findByIds(ids)
    return roles
  }
}