import { logger } from "@/utils/logger";
import { Administrator } from "../../infrastructure/persistence/entities/Administrator";
import { AdministratorRepository } from "../../repositories";

export class GetAdministratorUseCase {
  async execute(): Promise<Administrator[]> {
    const administrator = await AdministratorRepository().find();
    logger.info("Buscando informações da empresa administradora");
    return administrator;
  }
}
