import { inject, injectable } from "tsyringe"
import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { CreateUserAccessControllList } from "../contracts/create-user-access-controll-list"

import { IUserRepository } from "../repositories/iuser-repository"
import { IPermissionRepository } from "@/modules/permissions/repositories/ipermission-repository"
import { IRoleRepository } from "@/modules/permissions/repositories/irole-repository"

@injectable()
export class CreateUserAccessControlListUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("PermissionRepository")
    private permissionRepository: IPermissionRepository,
    @inject("RoleRepository")
    private roleRepository: IRoleRepository,
  ) {}
  
  async execute({ permissions, roles, userId }: CreateUserAccessControllList.Input): Promise<CreateUserAccessControllList.Output> {

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new AppError("Usuário não existe!", 404))
    }

    const permissionsExists = await this.permissionRepository.findByIds(
      permissions
    )
    
    if(roles && roles.length >= 1){
      const rolesExists = await this.roleRepository.findByIds(roles)
      user.roles = rolesExists
    }

    user.permissions = permissionsExists

    const userOutput = await this.userRepository.update(user)

    return right(userOutput)
  }
}
