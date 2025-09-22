import { logger } from "@/utils/logger";
import { Category } from "../../infrastructure/persistence/entities/Category";
import { CategoryRepository } from "../../repositories";
import { log } from "winston";

type CategoryType = {
  name: string;
};

export class CreateCategoryUseCase {
  async execute({ name }: CategoryType): Promise<Category | Error> {
    logger.info("Criando nova categoria");
    const category = CategoryRepository().create({
      name,
    });
    if (await CategoryRepository().findOne({ name })) {
      logger.warn("Categoria já existe!");
      return new Error("Categoria já existe!");
    }
    await CategoryRepository().save(category);
    logger.info("Categoria criada com sucesso.");
    return category;
  }
}
