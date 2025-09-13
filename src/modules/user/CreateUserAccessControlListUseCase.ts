import { logger } from "@/utils/logger";
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
    logger.info(`Iniciando configuração de ACL do usuário ${userId}`);
    const repo = UserRepository();

    const user = await repo.findOne(userId);

    if (!user) {
      logger.warn("Usuário não encontrado.");
      return new Error("Usuário não existe!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    if (roles && roles.length >= 1) {
      logger.info(`Atribuindo funções/cargos ao usuário ${userId}`);
      const rolesExists = await RoleRepository().findByIds(roles);
      user.roles = rolesExists;
    }

    user.permissions = permissionsExists;

    repo.save(user);
    logger.info(`ACL do usuário ${userId} configurada com sucesso.`);
    return user;
  }
}
