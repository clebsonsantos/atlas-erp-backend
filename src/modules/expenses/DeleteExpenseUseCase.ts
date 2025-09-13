import { logger } from "@/utils/logger";
import { ExpenseRepository } from "../../repositories";

type Type = {
  id: string;
};

export class DeleteExpenseUseCase {
  async execute({ id }: Type) {
    logger.info(`Iniciando processo de exclusão da despesa ${id}`);
    const expense = await ExpenseRepository().findOne({ id });

    if (!expense) {
      logger.warn("Registro não encontrado.");
      return new Error("Registro não encontrado.");
    }

    await ExpenseRepository().delete({ id });
    logger.info(`Despesa "${expense.id}" deletada com sucesso.`);
  }
}
