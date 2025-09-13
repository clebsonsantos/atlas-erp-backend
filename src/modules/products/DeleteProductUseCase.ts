import { logger } from "@/utils/logger";
import { ProductRepository } from "../../repositories";

type Type = {
  id: string;
};

export class DeleteProductUseCase {
  async execute({ id }: Type) {
    logger.info(`Iniciando processo de exclusão do produto ${id}`);
    const product = await ProductRepository().findOne({ id });
    let ErrorQuery: string;

    if (!product) {
      logger.warn("Produto não encontrado.");
      return new Error("Produto não encontrado.");
    }

    await ProductRepository()
      .delete({ id })
      .catch((error) => {
        ErrorQuery = error.message;
      });

    if (ErrorQuery && ErrorQuery.includes("violates foreign key constraint")) {
      const message = `Não é possível deletar o produto "${product.name}" pois o mesmo está vinculado a um ou mais registros.`;
      logger.warn(message);
      return new Error(message);
    }
    return "OK";
  }
}
