import { Between } from "typeorm";
import { Category } from "../../infrastructure/persistence/entities/Category";
import { CentersCost } from "../../infrastructure/persistence/entities/CentersCost";
import { Customers } from "../../infrastructure/persistence/entities/Customers";
import { Expenses } from "../../infrastructure/persistence/entities/Expenses";
import { Product } from "../../infrastructure/persistence/entities/Product";
import { Sales } from "../../infrastructure/persistence/entities/Sales";
import { User } from "../../infrastructure/persistence/entities/User";
import {
  CategoryRepository,
  CenterCostRepository,
  CustomerRepository,
  ExpenseRepository,
  ProductRepository,
  SalesRepository,
  UserRepository,
} from "../../repositories";
import { logger } from "@/utils/logger";
type IReports = {
  action?: string | any;
  initial_date?: Date | any;
  final_date?: Date | any;
  customer_id?: string | any;
  salesman?: string | any;
};

export class GetReportsUseCase {
  async execute({
    action,
    initial_date,
    final_date,
    customer_id,
    salesman,
  }: IReports): Promise<
    | Customers[]
    | Sales[]
    | Product[]
    | Category[]
    | CentersCost[]
    | Expenses[]
    | User[]
    | Error
  > {
    let customers = action == "customers" ? true : false;
    let sales = action == "sales" ? true : false;
    let products = action == "products" ? true : false;
    let categories = action == "categories" ? true : false;
    let centers_cost = action == "centers_cost" ? true : false;
    let expenses = action == "expenses" ? true : false;
    let users = action == "users" ? true : false;

    let initial = new Date(initial_date);
    let final = new Date(final_date);
    // final.setDate(final.getDate() + 1)

    if (initial > final) {
      return new Error("Infome um período válido.");
    }

    if (customers) {
      logger.info("Buscando clientes para relatório");
      const customers = await CustomerRepository().find({
        order: { full_name: "ASC" },
      });
      logger.info("Quantidade de clientes encontrados: " + customers.length);
      return customers;
    } else if (sales) {
      logger.info("Buscando vendas para relatório");
      const sales =
        initial_date && final_date
          ? await SalesRepository().find({
              order: { date: "ASC" },
              where: { date: Between(initial, final) },
              relations: ["products_sold", "customer"],
            })
          : await SalesRepository().find({
              order: { date: "ASC" },
              relations: ["products_sold", "customer"],
            });

      logger.info("Quantidade de vendas encontradas: " + sales.length);
      if (sales.length == 0 && initial && final_date) {
        logger.warn("Não existem vendas registradas no período informado");
        return new Error("Não existem vendas registradas no período informado");
      }
      let onNewSales: Sales[];
      if (customer_id && !salesman) {
        logger.info("Filtrando vendas por cliente");
        onNewSales = sales.filter((sale) => sale.customer_id == customer_id);
        if (onNewSales.length == 0 && initial_date && final_date) {
          const message =
            "Não existem vendas registradas para este cliente no período selecionado";
          logger.warn(message);
          return new Error(message);
        } else if (onNewSales.length == 0) {
          const message = "Não existem vendas registradas no período informado";
          logger.warn(message);
          return new Error(message);
        }
        return onNewSales;
      } else if (salesman && !customer_id) {
        logger.info("Filtrando vendas por vendedor");
        onNewSales = sales.filter((sale) => sale.salesman == salesman);
        if (onNewSales.length == 0 && initial_date && final_date) {
          const message = `Não existem vendas registradas para este vendedor no período selecionado`;
          logger.warn(message);
          return new Error(message);
        } else if (onNewSales.length == 0) {
          const message = "Não existem vendas registradas no período informado";
          logger.warn(message);
          return new Error(message);
        }
        return onNewSales;
      } else if (customer_id && salesman) {
        logger.info("Filtrando vendas por vendedor e cliente");
        onNewSales = sales.filter((sale) => sale.salesman == salesman);
        onNewSales = onNewSales.filter(
          (sale) => sale.customer_id == customer_id
        );
        if (onNewSales.length == 0 && initial_date && final_date) {
          const message = `Não existem vendas registradas para este vendedor e cliente no período selecionado`;
          logger.warn(message);
          return new Error(message);
        } else if (onNewSales.length == 0) {
          const message = "Não existem vendas registradas no período informado";
          logger.warn(message);
          return new Error(message);
        }
        logger.info("Quantidade de vendas encontradas: " + onNewSales.length);
        return onNewSales;
      }
      logger.info("Quantidade de vendas encontradas: " + sales.length);
      return sales;
    } else if (products) {
      logger.info("Buscando produtos para relatório");
      const products = await ProductRepository().find({
        order: { name: "ASC" },
        relations: ["center_cost"],
      });
      logger.info("Quantidade de produtos encontrados: " + products.length);
      return products;
    } else if (categories) {
      logger.info("Buscando categorias para relatório");
      const categories = await CategoryRepository().find({
        order: { name: "ASC" },
      });
      logger.info("Quantidade de categorias encontradas: " + categories.length);
      return categories;
    } else if (centers_cost) {
      logger.info("Buscando centros de custo para relatório");
      const centers_cost = await CenterCostRepository().find({
        order: { name: "ASC" },
      });
      logger.info(
        "Quantidade de centros de custo encontrados: " + centers_cost.length
      );
      return centers_cost;
    } else if (expenses) {
      logger.info("Buscando despesas para relatório");
      const expenses =
        initial_date && final_date
          ? await ExpenseRepository().find({
              order: { date: "ASC" },
              where: { date: Between(initial, final) },
              relations: ["category", "center_cost"],
            })
          : await ExpenseRepository().find({
              order: { date: "ASC" },
              relations: ["category", "center_cost"],
            });
      logger.info("Quantidade de despesas encontradas: " + expenses.length);
      if (expenses.length == 0 && initial && final_date) {
        const message = "Não existem despesas registradas no período informado";
        logger.warn(message);
        return new Error(message);
      }
      return expenses;
    } else if (users) {
      logger.info("Buscando usuários para relatório");
      const users = await UserRepository().find({
        order: { full_name: "ASC" },
      });
      logger.info("Quantidade de usuários encontrados: " + users.length);
      return users;
    }

    return new Error("Parametros de pesquisa não foram informados.");
  }
}
