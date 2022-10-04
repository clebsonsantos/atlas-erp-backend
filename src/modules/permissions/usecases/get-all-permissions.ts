import { inject, injectable } from "tsyringe";
import { Permission } from "../infra/typeorm/entities/permission";
import { IPermissionRepository } from "../repositories/ipermission-repository";

@injectable()
export class GetAllPermissionsUseCase  {

  constructor(
    @inject("PermissionRepository")
    private readonly permissionRepository: IPermissionRepository
  ){}

  async execute(): Promise<Permission[]> {
   const permissions = await this.permissionRepository.getAll()
   return permissions
  }
}
