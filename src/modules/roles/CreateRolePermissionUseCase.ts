import { logger } from "@/utils/logger";
import { Role } from "../../infrastructure/persistence/entities/Role";
import { PermissionRepository, RoleRepository } from "../../repositories";

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

export class CreateRolePermissionUseCase {
  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    logger.info(`Atribuindo permissões à função/cargo: ${roleId}`);
    const repo = RoleRepository();

    const role = await repo.findOne(roleId);

    if (!role) {
      logger.warn("Função/cargo não encontrado.");
      return new Error("Função/cargo não existe!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await repo.save(role);
    logger.info(`Permissões atribuídas à função/cargo ${roleId} com sucesso.`);
    return role;
  }
}
