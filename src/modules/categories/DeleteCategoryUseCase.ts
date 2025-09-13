import { logger } from "@/utils/logger";
import { CategoryRepository } from "../../repositories";

type Type = {
  id: string;
};

export class DeleteCategoryUseCase {
  async execute({ id }: Type): Promise<Error | any> {
    logger.info(`Iniciando processo de exclusão da categoria ${id}`);
    let ErrorQuery;
    const category = await CategoryRepository().findOne({ id });

    if (!category) {
      logger.warn("Categoria não existe.");
      return new Error("Categoria não existe!");
    }
    const deleteRepository = CategoryRepository();

    await deleteRepository.delete({ id }).catch((error) => {
      ErrorQuery = error.message;
    });
    if (ErrorQuery && ErrorQuery.includes("constraint")) {
      const message = `Não é possível deletar a categoria "${category.name}" pois a mesma está vinculada a um ou mais produtos.`;
      logger.warn(message);
      return new Error(message);
    }
    logger.info(`Categoria "${category.name}" deletada com sucesso.`);
    return "OK";
  }
}
