import { logger } from "@/utils/logger";
import { CategoryRepository } from "../../repositories";

type Type = {
  id: string;
  name: string;
};

export class UpdateCategoryUseCase {
  async execute({ id, name }: Type) {
    logger.info(`Iniciando processo de atualização da categoria ${id}`);
    const category = await CategoryRepository().findOne({ id });

    if (!category) {
      logger.warn("Categoria não existe.");
      return new Error("Categoria não existe.");
    }

    category.name = name ? name : category.name;

    CategoryRepository().save(category);
    logger.info(`Categoria "${category.name}" atualizada com sucesso.`);
    return category;
  }
}
