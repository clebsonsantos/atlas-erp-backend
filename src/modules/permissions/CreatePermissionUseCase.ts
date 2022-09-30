import { PermissionRepository } from "@/repositories";
import { Permission } from "./infra/typeorm/entities/permission";

type PermissionRequest = {
  name: string;
  description: string;
};

export class CreatePermissionUseCase {
  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    const repo = PermissionRepository();

    if (await repo.findOne({ name })) {
      return new Error("Permissão já existe!");
    }

    const permission = repo.create({ name, description });

    await repo.save(permission);

    return permission;
  }
}
