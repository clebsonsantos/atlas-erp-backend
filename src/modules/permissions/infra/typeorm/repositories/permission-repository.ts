import { CreatePermission } from "@/modules/permissions/contracts/create-permission" 
import { IPermissionRepository } from "@/modules/permissions/repositories/ipermission-repository" 
import { getRepository, Repository } from "typeorm" 
import { Permission } from "../entities/permission" 


export class PermissionRepository implements IPermissionRepository {
  
  private repository: Repository<Permission>
  constructor(){
    this.repository = getRepository(Permission)
  }

  async getAll(): Promise<Permission[]> {
    const permissions = await this.repository.find()
    return permissions
  }

  async add({ name, description }: CreatePermission.Params): Promise<Permission> {
    const permission = this.repository.create({ name, description })
    return await this.repository.save(permission)
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.repository.findOne({ name })
    return permission
  }

  async findByIds(ids: string[]): Promise<Permission[]> {
      const permissions = await this.repository.findByIds(ids)
      return permissions
  }
}