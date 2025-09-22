import { logger } from "@/utils/logger";
import { CentersCost } from "../../infrastructure/persistence/entities/CentersCost";
import { CenterCostRepository } from "../../repositories";

export class GetAllCenterCostUseCase {
  async execute(): Promise<CentersCost[]> {
    logger.info("Buscando todos os centros de custo");
    const centersCost = await CenterCostRepository().find({
      order: {
        created_at: "DESC",
      },
    });
    logger.info(`${centersCost.length} centros de custo encontrados.`);
    return centersCost;
  }
}
