import { logger } from "@/utils/logger";
import { Sales } from "../../infrastructure/persistence/entities/Sales";
import {
  CustomerRepository,
  ProductsSoldsRepository,
  SalesRepository,
} from "../../repositories";
import { log } from "winston";

type IproductsSolds = {
  id_product: string;
  quantity: number;
  price_unit: number;
  total_price: number;
};
type ISales = {
  date: Date;
  customer_id: string;
  salesman: string;
  userId?: string;
  products_sold: IproductsSolds[];
};

export class CreateSaleProductsSoldUseCase {
  async execute({
    date,
    customer_id,
    salesman,
    userId,
    products_sold,
  }: ISales): Promise<Sales | Error> {
    logger.info("Iniciando criação de venda");

    if (products_sold.length === 0) {
      logger.warn("Nenhum produto foi adicionado a venda.");
      return new Error("Adicione ao menos um produto a venda.");
    }

    if (!(await CustomerRepository().findOne(customer_id))) {
      logger.warn("Este cliente não existe.");
      return new Error("Este cliente não existe.");
    }

    const sales = await SalesRepository().find();
    const sale_number = sales.length + 1;
    const salesman_id = salesman ? salesman : userId;
    const sale = SalesRepository().create({
      date,
      customer_id,
      salesman: salesman_id,
      sale_number,
    });

    const ids_products = new Array();

    for await (const product of products_sold) {
      logger.info(`Adicionando produto ${product.id_product} a venda`);
      if (product.quantity <= 0) {
        logger.warn("A quantidade deve ser maior que zero.");
        return new Error("A quantidade deve ser maior que zero.");
      }
      if (product.price_unit <= 0) {
        logger.warn("O preço unitário deve ser maior que zero.");
        return new Error("O preço unitário deve ser maior que zero.");
      }
      if (product.total_price <= 0) {
        logger.warn("O preço total deve ser maior que zero.");
        return new Error("O preço total deve ser maior que zero.");
      }
      const productsSold = ProductsSoldsRepository().create(product);
      ids_products.push(productsSold.id);
      await ProductsSoldsRepository().save(productsSold);
    }

    const productsExists = await ProductsSoldsRepository().findByIds(
      ids_products
    );
    sale.products_sold = productsExists;

    await SalesRepository().save(sale);
    logger.info(`Venda ${sale.id} criada com sucesso.`);
    logger.info(`Ids dos produtos vendidos: ${ids_products.join(", ")}`);
    return sale;
  }
}
