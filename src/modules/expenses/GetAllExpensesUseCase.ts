import { logger } from "@/utils/logger";
import { Expenses } from "../../infrastructure/persistence/entities/Expenses";
import { ExpenseRepository } from "../../repositories";

export class GetAllExpensesUseCase {
  async execute(): Promise<Expenses[]> {
    logger.info("Buscando todas as despesas");
    const expenses = await ExpenseRepository().find({
      relations: ["category", "center_cost"],
    });
    logger.info(`${expenses.length} despesas encontradas.`);
    return expenses;
  }
}
