import { inject, injectable } from "tsyringe"
import {
  PermissionRepository,
  RoleRepository,
} from "../../repositories"
import { User } from "./infra/typeorm/entities/user"
import { IUserRepository } from "./repositories/iuser-reposiotry"

type UserACLRequest = {
  userId: string
  roles: string[]
  permissions: string[]
}

@injectable()
export class CreateUserAccessControlListUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}
  
  async execute({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return new Error("Usuário não existe!")
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

    return userResult
  }
}
