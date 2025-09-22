import { logger } from "@/utils/logger";
import { CentersCost } from "../../infrastructure/persistence/entities/CentersCost";
import { CenterCostRepository } from "../../repositories";
import { log } from "winston";

type Type = {
  id: string;
  name: string;
};

export class UpdateCenterCostUseCase {
  async execute({ id, name }: Type): Promise<CentersCost | Error> {
    logger.info(`Iniciando processo de atualização do centro de custo ${id}`);
    const center_cost = await CenterCostRepository().findOne({ id });

    if (!center_cost) {
      logger.warn("Centro de custo não existe.");
      return new Error("Centro de custo não existe");
    }

    center_cost.name = name ? name : center_cost.name;

    await CenterCostRepository().save(center_cost);

    logger.info(
      `Centro de custo "${center_cost.name}" atualizado com sucesso.`
    );
    return center_cost;
  }
}
