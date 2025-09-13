import { logger } from "@/utils/logger";
import { CenterCostRepository } from "../../repositories";
import { log } from "winston";

type Type = {
  id: string;
};

export class DeleteCenterCostUseCase {
  async execute({ id }: Type): Promise<any | Error> {
    logger.info(`Iniciando processo de exclusão do centro de custo ${id}`);
    let ErrorQuery;

    const center_cost = await CenterCostRepository().findOne({ id });

    if (!center_cost) {
      logger.warn("Centro de custo não existe.");
      return new Error("Centro de custo não existe");
    }

    await CenterCostRepository()
      .delete({ id })
      .catch((erro) => {
        ErrorQuery = erro.message;
      });

    if (ErrorQuery && ErrorQuery.includes("constraint")) {
      const message = `Não é possível deletar o centro de custo "${center_cost.name}" pois a mesma está vinculada a um ou mais registros.`;
      logger.warn(message);
      return new Error(message);
    }

    return "OK";
  }
}
