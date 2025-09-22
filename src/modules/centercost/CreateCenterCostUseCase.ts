import { logger } from "@/utils/logger";
import { CentersCost } from "../../infrastructure/persistence/entities/CentersCost";
import { CenterCostRepository } from "../../repositories";

type CategoryType = {
  name: string;
};

export class CreateCenterCostUseCase {
  async execute({ name }: CategoryType): Promise<CentersCost | Error> {
    logger.info("Criando novo centro de custo");
    const category = CenterCostRepository().create({
      name,
    });
    if (await CenterCostRepository().findOne({ name })) {
      logger.warn("Centro de custo já existe!");
      return new Error("Centro de custo já existe!");
    }
    await CenterCostRepository().save(category);

    logger.info("Centro de custo criado com sucesso.");
    return category;
  }
}
