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
  action?: string | any;
  initial_date?: Date | any;
  final_date?: Date | any;
}


export class GetReportsUseCase  {

  async execute({action ,initial_date, final_date}: IReports): Promise< Customers[] | Sales[] | Product[] | Category[] | CentersCost[] | Expenses[] | User[] | Error> {

    let customers = action == 'customers' ? true : false
    let sales = action == 'sales' ? true : false
    let products = action == 'products' ? true : false
    let categories = action == 'categories' ? true : false
    let centers_cost = action == 'centers_cost' ? true : false
    let expenses = action == 'expenses' ? true : false
    let users = action == 'users' ? true : false

    let initial = new Date(initial_date)
    let final = new Date(final_date)
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
      const products = await ProductRepository().find({order: {name: "ASC"}, relations: ['center_cost']})
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
