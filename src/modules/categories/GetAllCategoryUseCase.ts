import { logger } from "@/utils/logger";
import { Category } from "../../infrastructure/persistence/entities/Category";
import { CategoryRepository } from "../../repositories";

export class GetAllCategoryUseCase {
  async execute(): Promise<Category[]> {
    logger.info("Buscando todas as categorias");
    const categories = await CategoryRepository().find({
      order: {
        created_at: "DESC",
      },
    });
    logger.info(`${categories.length} categorias encontradas.`);
    return categories;
  }
}
