import { logger } from "@/utils/logger";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class FindOneUserUseCase {
  async execute(username: string): Promise<User> {
    logger.info(`Buscando usuário: ${username}`);
    const users = await UserRepository().findOne(
      { username },
      { relations: ["permissions", "roles"] }
    );
    logger.info(`Usuário ${username} encontrado.`);
    return users;
  }
}
