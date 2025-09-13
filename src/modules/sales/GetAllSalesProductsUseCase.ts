import { logger } from "@/utils/logger";
import { Sales } from "../../entities/Sales";
import { SalesRepository } from "../../repositories";

export class GetAllSalesProductsUseCase {
  async execute(): Promise<Sales[]> {
    logger.info("Buscando todos os pedidos de venda");
    const sales = await SalesRepository().find({
      relations: ["products_sold", "customer"],
      order: { created_at: "DESC" },
    });
    logger.info(`${sales.length} pedidos de venda encontrados.`);
    return sales;
  }
}
