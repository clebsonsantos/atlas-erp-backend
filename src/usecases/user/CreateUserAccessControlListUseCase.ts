import { User } from "../../entities/User";
import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from "../../repositories";

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

export class CreateUserAccessControlListUseCase {
  async execute({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {
    const repo = UserRepository();

    const user = await repo.findOne(userId);

    if (!user) {
      return new Error("Usuário não existe!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );
    
    if(roles && roles.length >= 1){
      const rolesExists = await RoleRepository().findByIds(roles);
      user.roles = rolesExists;
    }

    user.permissions = permissionsExists;

    repo.save(user);

    return user;
  }
}
