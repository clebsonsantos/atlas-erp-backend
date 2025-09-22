import { logger } from "@/utils/logger";
import { Role } from "../../infrastructure/persistence/entities/Role";
import { RoleRepository } from "../../repositories";

type RoleRequest = {
  name: string;
  description: string;
};

export class CreateRoleUseCase {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    logger.info(`Criando nova função/cargo: ${name}`);
    const repo = RoleRepository();

    if (await repo.findOne({ name })) {
      logger.warn("Função/cargo já existe!");
      return new Error("Função/cargo já existe!");
    }
    const role = repo.create({ name, description });
    await repo.save(role);

    logger.info(`Função/cargo ${name} criada com sucesso.`);
    return role;
  }
}
