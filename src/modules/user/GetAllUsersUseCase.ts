import { logger } from "@/utils/logger";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class GetAllUsersUseCase {
  async execute(): Promise<User[]> {
    //"roles" relationship removed, returning only the permissions
    logger.info("Buscando todos os usuários");
    const users = await UserRepository().find({
      relations: ["permissions"],
      order: { full_name: "ASC" },
    });
    logger.info(`${users.length} usuários encontrados.`);
    return users;
  }
}
