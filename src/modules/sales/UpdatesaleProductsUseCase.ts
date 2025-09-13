import { logger } from "@/utils/logger";
import { Sales } from "../../entities/Sales";
import { ProductsSoldsRepository, SalesRepository } from "../../repositories";

type IproductsSolds = {
  id?: string;
  delete?: boolean;
  id_product: string;
  quantity: number;
  price_unit: number;
  total_price: number;
  created_at: Date;
};
type ISales = {
  id: string;
  date: Date;
  customer_id: string;
  salesman: string;
  products_sold: IproductsSolds[];
};

export class UpdatesaleProductsUseCase {
  async execute({
    id,
    date,
    customer_id,
    products_sold,
    salesman,
  }: ISales): Promise<Sales | Error> {
    logger.info(`Iniciando atualização do pedido de venda ${id}`);

    if (products_sold.length === 0) {
      logger.warn("Nenhum produto foi adicionado a venda.");
      return new Error("Adicione ao menos um produto a venda.");
    }
    const sale = await SalesRepository().findOne(
      { id },
      { relations: ["products_sold"] }
    );

    if (!sale) {
      return new Error("Este pedido/venda não existe.");
    }

    sale.customer_id = customer_id ? customer_id : sale.customer_id;
    sale.date = date ? date : sale.date;
    sale.salesman = salesman ? salesman : sale.salesman;

    const ids_soldsProducts = new Array();

    //Editar produto existente
    for await (const item of sale.products_sold) {
      for await (const product of products_sold) {
        logger.info(`Atualizando produto ${product.id_product} da venda`);

        if (product.id === item.id) {
          const productSold = await ProductsSoldsRepository().findOne({
            id: product.id,
          });

          productSold.id_product = product.id_product
            ? product.id_product
            : productSold.id_product;
          productSold.price_unit = product.price_unit
            ? product.price_unit
            : productSold.price_unit;
          productSold.total_price = product.total_price
            ? product.total_price
            : productSold.total_price;
          productSold.quantity = product.quantity
            ? product.quantity
            : productSold.quantity;
          await ProductsSoldsRepository().save(productSold);
          logger.info(`Produto ${product.id_product} atualizado na venda.`);
          ids_soldsProducts.push(productSold.id);
        }
      }
    }

    //Remover produto com tag [delete]
    for await (const product of products_sold) {
      logger.info(`Verificando remoção do produto ${product.id_product}`);
      if (product.delete == true) {
        const productSold = await ProductsSoldsRepository().findOne({
          id: product.id,
        });

        if (!productSold) {
          return new Error("Este(s) lançamento(s) não existe(m).");
        }

        await ProductsSoldsRepository().delete(productSold.id);
        logger.info(`Produto ${product.id_product} removido da venda.`);
        const index = ids_soldsProducts.indexOf(product.id);
        ids_soldsProducts.splice(index, 1);
      }
    }

    //Inserir um novo produto na venda
    for await (const newProducts of products_sold) {
      logger.info(`Verificando novo produto ${newProducts.id_product}`);
      if (!newProducts.id) {
        const productsSold = ProductsSoldsRepository().create(newProducts);
        await ProductsSoldsRepository().save(productsSold);
        logger.info(`Produto ${newProducts.id_product} adicionado a venda.`);
        ids_soldsProducts.push(productsSold.id);
      }
    }

    const soldsExists = await ProductsSoldsRepository().findByIds(
      ids_soldsProducts
    );

    sale.products_sold = soldsExists;
    await SalesRepository().save(sale);
    logger.info(`Pedido de venda ${sale.id} atualizado com sucesso.`);
    return sale;
  }
}
