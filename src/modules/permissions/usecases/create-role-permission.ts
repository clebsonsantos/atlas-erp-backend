import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { CreateRolePermission } from "../contracts/create-role-permission"
import { IPermissionRepository } from "../repositories/ipermission-repository"
import { IRoleRepository } from "../repositories/irole-repository"


@injectable()
export class CreateRolePermissionUseCase {
  constructor(
    @inject("RoleRepository")
    private readonly roleRepository: IRoleRepository,
    @inject("PermissionRepository")
    private readonly permissionRepository: IPermissionRepository,
  ){}

  async execute({
    roleId,
    permissions,
  }: CreateRolePermission.Input): Promise<CreateRolePermission.Output> {
    
    const validate = this.validate(roleId, permissions)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }

    const role = await this.roleRepository.findOne(roleId)
    if (!role) {
      return left(new AppError("Função/cargo não existe!"))
    }

    const permissionsExists = await this.permissionRepository.findByIds(
      permissions
    )

    role.permissions = permissionsExists

    const resultRole = await this.roleRepository.addPermission(role)

    return right(resultRole)
  }

  validate(roleId: string, permissions: string[]): Either<string, null> {
    const messageError = `Input is required: `
    if (!roleId) {
      return left(messageError.concat("roleId"))
    }
    if (!permissions.length) {
      return left(messageError.concat("permissions"))
    }
    return right(null)
  }
}
