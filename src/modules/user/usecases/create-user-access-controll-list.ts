import { inject, injectable } from "tsyringe"
import { PermissionRepository, RoleRepository } from "@/repositories"
import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { CreateUserAccessControllList } from "../contracts/create-user-access-controll-list"

import { IUserRepository } from "../repositories/iuser-reposiotry"

@injectable()
export class CreateUserAccessControlListUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}
  
  async execute({ permissions, roles, userId }: CreateUserAccessControllList.Params): Promise<CreateUserAccessControllList.Result> {

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new AppError("Usuário não existe!"))
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    )
    
    if(roles && roles.length >= 1){
      const rolesExists = await RoleRepository().findByIds(roles)
      user.roles = rolesExists
    }

    user.permissions = permissionsExists

    const userResult = await this.userRepository.update(user)

    return right(userResult)
  }
}
