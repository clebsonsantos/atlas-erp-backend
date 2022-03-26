import { Between } from 'typeorm';
import { Category } from '../../entities/Category';
import { CentersCost } from '../../entities/CentersCost';
import { Customers } from '../../entities/Customers';
import { Expenses } from '../../entities/Expenses';
import { Product } from '../../entities/Product';
import { Sales } from '../../entities/Sales';
import { User } from '../../entities/User';
import { CategoryRepository, CenterCostRepository, CustomerRepository, ExpenseRepository, ProductRepository, SalesRepository, UserRepository } from '../../repositories';

type IReports = {
  customers?: boolean;
  sales?: boolean;
  products?: boolean;
  categories?: boolean;
  centers_cost?: boolean;
  expenses?: boolean;
  users?: boolean;
  initial_date?: Date;
  final_date?: Date;
}


export class GetReportsUseCase  {

  async execute({customers, sales, products, categories, centers_cost, expenses, users, initial_date, final_date}: IReports): Promise< Customers[] | Sales[] | Product[] | Category[] | CentersCost[] | Expenses[] | User[] | Error> {

    const initial = new Date(initial_date)
    const final = new Date(final_date)
    initial.setDate(initial.getDate() -1)
    final.setDate(final.getDate() +1)

    if(customers){
      const customers = await CustomerRepository().find({order: {full_name: "ASC"}})
      return customers

    }else if(sales){
      const sales = (initial_date && final_date) ?
        await SalesRepository().find({order: {date: "ASC"}, where: {date: Between(initial, final)}, relations: ["products_sold", "customer"] })
        : 
        await SalesRepository().find({order: {date: "ASC"}, relations: ["products_sold", "customer"] })

      return sales

    }else if(products){
      const products = await ProductRepository().find({order: {name: "ASC"}})
      return products

    }else if(categories){
      const categories = await CategoryRepository().find({order: {name: "ASC"}})
      return categories

    }else if(centers_cost){
      const centers_cost = await CenterCostRepository().find({order: {name: "ASC"}})
      return centers_cost

    }else if(expenses){
      const expenses = (initial_date && final_date) ?
      await ExpenseRepository().find({order: {date: "ASC"}, where: {date: Between(initial, final)}, relations: ["category", "center_cost"] })
      :
      await ExpenseRepository().find({order: {date: "ASC"}, relations: ["category", "center_cost"] })

      return expenses

    }else if(users){
      const users = await UserRepository().find({order: {full_name: 'ASC'}})
      return users
    }

    return new Error("Parametros de pesquisa não foram informados.")
    
  }
}
