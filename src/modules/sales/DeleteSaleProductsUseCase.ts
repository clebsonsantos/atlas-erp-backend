import { logger } from "@/utils/logger";
import { ProductsSoldsRepository, SalesRepository } from "../../repositories";
import { log } from "winston";

type Type = {
  id: string;
};

export class DeleteSaleProductsUseCase {
  async execute({ id }: Type): Promise<any | Error> {
    logger.info(`Iniciando remoção do pedido de venda ${id}`);
    const sale = await SalesRepository().findOne(
      { id },
      { relations: ["products_sold"] }
    );
    if (!sale) {
      logger.warn("Pedido de venda não encontrado.");
      return new Error("Pedido de venda não encontrado.");
    }

    SalesRepository().delete({ id });
    sale.products_sold.forEach(async (item) => {
      ProductsSoldsRepository().delete({ id: item.id });
    });
    logger.info(`Pedido de venda ${id} deletado com sucesso.`);
    return "Pedido de venda deletado com sucesso.";
  }
}
