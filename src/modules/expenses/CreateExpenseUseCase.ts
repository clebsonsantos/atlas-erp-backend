import { logger } from "@/utils/logger";
import { Expenses } from "../../entities/Expenses";
import {
  CategoryRepository,
  CenterCostRepository,
  ExpenseRepository,
} from "../../repositories";

type ExpenseTypes = {
  description: string;
  amount: number;
  quantity: number;
  frequency: string;
  type: string;
  date: Date;
  center_cost_id: string;
  category_id: string;
};

export class CreateExpenseUseCase {
  async execute({
    description,
    amount,
    quantity,
    frequency,
    type,
    date,
    center_cost_id,
    category_id,
  }: ExpenseTypes): Promise<Expenses | Error> {
    logger.info("Criando nova despesa");
    const expense = ExpenseRepository().create({
      description,
      amount,
      quantity,
      frequency,
      type,
      date,
      center_cost_id,
      category_id,
    });

    if (!(await CenterCostRepository().findOne({ id: center_cost_id }))) {
      logger.warn(`O centro de custo com ID ${center_cost_id} não existe.`);
      return new Error("Centro de custo não existe!");
    }
    if (!(await CategoryRepository().findOne({ id: category_id }))) {
      logger.warn(`A categoria com ID ${category_id} não existe.`);
      return new Error("Categoria não existe!");
    }

    await ExpenseRepository().save(expense);
    logger.info(`A despesa "${expense.id}" foi criada com sucesso.`);
    return expense;
  }
}
