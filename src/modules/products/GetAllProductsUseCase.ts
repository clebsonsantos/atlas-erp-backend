import { logger } from "@/utils/logger";
import { Product } from "../../infrastructure/persistence/entities/Product";
import { ProductRepository } from "../../repositories";

type IProductSearch = {
  id?: string;
  name?: string;
};

export class GetAllProductsUseCase {
  async execute({ id, name }: IProductSearch): Promise<Product[] | Product> {
    logger.info("Buscando produtos");
    const findByParams = id
      ? await ProductRepository().findOne(
          { id },
          { relations: ["center_cost"] }
        )
      : await ProductRepository().findOne(
          { name },
          { relations: ["center_cost"] }
        );
    const paramsFind = id ? id : name;
    logger.info(
      paramsFind
        ? `Produto(s) encontrado(s) com o parâmetro: ${paramsFind}`
        : "Nenhum parâmetro informado, buscando todos os produtos"
    );
    const products = paramsFind
      ? findByParams
      : await ProductRepository().find({
          relations: ["center_cost"],
          order: {
            name: "ASC",
          },
        });

    logger.info(
      paramsFind
        ? `Produto(s) encontrado(s) com o parâmetro: ${paramsFind}`
        : `${(products as Product[]).length} produtos encontrados.`
    );
    return products;
  }
}
