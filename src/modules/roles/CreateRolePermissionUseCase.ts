import { PermissionRepository, RoleRepository } from "../../repositories";
import { Role } from "./infra/typeorm/entities/role";

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

export class CreateRolePermissionUseCase {
  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const repo = RoleRepository();

    const role = await repo.findOne(roleId);

    if (!role) {
      return new Error("Função/cargo não existe!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await repo.save(role);

    return role;
  }
}
