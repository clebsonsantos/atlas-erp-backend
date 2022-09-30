import { Between } from 'typeorm';
import { Category } from '../../entities/Category';
import { CentersCost } from '../../entities/CentersCost';
import { Expenses } from '../../entities/Expenses';
import { Product } from '../../entities/Product';
import { Sales } from '../../entities/Sales';
import { CategoryRepository, CenterCostRepository, CustomerRepository, ExpenseRepository, ProductRepository, SalesRepository, UserRepository } from '../../repositories';
import { Customer } from "../customers/infra/typeorm/entities/customer";
import { User } from "../user/infra/typeorm/entities/user";

type IReports = {
  action?: string | any;
  initial_date?: Date | any;
  final_date?: Date | any;
  customer_id?: string | any;
  salesman?:string | any
}


export class GetReportsUseCase  {

  async execute({action ,initial_date, final_date, customer_id, salesman}: IReports): Promise< Customer[] | Sales[] | Product[] | Category[] | CentersCost[] | Expenses[] | User[] | Error> {

    let customers = action == 'customers' ? true : false
    let sales = action == 'sales' ? true : false
    let products = action == 'products' ? true : false
    let categories = action == 'categories' ? true : false
    let centers_cost = action == 'centers_cost' ? true : false
    let expenses = action == 'expenses' ? true : false
    let users = action == 'users' ? true : false

    let initial = new Date(initial_date)
    let final = new Date(final_date)
    // final.setDate(final.getDate() + 1)

    if(initial > final){
      return new Error("Infome um período válido.")
    }
    
    if(customers){
      const customers = await CustomerRepository().find({order: {full_name: "ASC"}})
      return customers

    }else if(sales){
      const sales = (initial_date && final_date) ?
        await SalesRepository().find({order: {date: "ASC"}, where: {date: Between(initial, final)}, relations: ["products_sold", "customer"] })
        : 
        await SalesRepository().find({order: {date: "ASC"}, relations: ["products_sold", "customer"] })

      if(sales.length == 0 && (initial && final_date)){
        return new Error("Não existem vendas registradas no período informado")
      }
      let onNewSales: Sales[]
      if(customer_id && !salesman){
        onNewSales = sales.filter(sale => sale.customer_id == customer_id)
        if(onNewSales.length == 0 && (initial_date && final_date)){
          return new Error("Não existem vendas registradaspara este cliente no período selecionado")
        }
        else if(onNewSales.length == 0){
          return new Error("Não existem vendas registradas no período informado")
        }
        return onNewSales
      }else if(salesman && !customer_id){
        onNewSales = sales.filter(sale => sale.salesman == salesman)
        if(onNewSales.length == 0 && (initial_date && final_date)){
          return new Error("Não existem vendas registradas para este vendedor no período selecionado")
        }
        else if(onNewSales.length == 0){
          return new Error("Não existem vendas registradas no período informado")
        }
        return onNewSales
      }else if(customer_id && salesman){
        onNewSales = sales.filter(sale => sale.salesman == salesman)
        onNewSales = onNewSales.filter(sale => sale.customer_id == customer_id)
        if(onNewSales.length == 0 && (initial_date && final_date)){
          return new Error("Não existem vendas registradas para este vendedor e cliente no período selecionado")
        }
        else if(onNewSales.length == 0){
          return new Error("Não existem vendas registradas no período informado")
        }
        return onNewSales
      }
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
      if(expenses.length == 0 && (initial && final_date)){
        return new Error("Não existem despesas registradas no período informado")
      }
      return expenses

    }else if(users){
      const users = await UserRepository().find({order: {full_name: 'ASC'}})
      return users
    }

    return new Error("Parametros de pesquisa não foram informados.")
    
  }
}
