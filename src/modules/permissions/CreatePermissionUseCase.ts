import { logger } from "@/utils/logger";
import { Permission } from "../../infrastructure/persistence/entities/Permission";
import { PermissionRepository } from "../../repositories";

type PermissionRequest = {
  name: string;
  description: string;
};

export class CreatePermissionUseCase {
  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    logger.info(`Criando nova permissão: ${name}`);
    const repo = PermissionRepository();

    if (await repo.findOne({ name })) {
      logger.warn("Permissão já existe!");
      return new Error("Permissão já existe!");
    }

    const permission = repo.create({ name, description });

    await repo.save(permission);
    logger.info(`Permissão ${name} criada com sucesso.`);
    return permission;
  }
}
