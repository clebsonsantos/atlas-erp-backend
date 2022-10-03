import { inject, injectable } from 'tsyringe';
import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { CreatePermission } from "./contracts/create-permission"
import { IPermissionRepository } from "./repositories/ipermission-repository"

@injectable()
export class CreatePermissionUseCase {
  constructor(
    @inject("PermissionRepository")
    private readonly permissionRepository: IPermissionRepository
  ){}
  
  async execute({
    name,
    description,
  }: CreatePermission.Params): Promise<CreatePermission.Result> {
    const permission = await this.permissionRepository.findByName(name)

    if (permission) {
      return left(new AppError("Permissão já existe!"))
    }

    const savePermission = await this.permissionRepository.add({ name, description })
    return right(savePermission)
  }
}
