import { inject, injectable } from "tsyringe"

import { Sales } from "@/modules/sales/infra/typeorm/entities/sale" 
import { ExpenseRepository } from "@/domain/contracts/repositories"
import { CategoryRepository } from "@/domain/contracts/repositories"
import { CenterCostRepository } from "@/domain/contracts/repositories"
import { CustomerRepositoryImpl } from "@/infra/database/repositories"
import { ProductRepository } from "@/modules/products/repositories/product-repository"
import { IUserRepository } from "@/modules/user/repositories/iuser-repository"
import { SaleRepository } from "@/modules/sales/repositories/sales-repository"
import { GetDataToRenderReport } from "../contracts/get-data-to-render-report"
import { AppError } from "@/shared/errors/AppError"
import { left, right } from "@/shared/either"


@injectable()
export class GetDataToRenderReportUseCase {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: CategoryRepository,
    @inject("CenterCostRepository")
    private readonly centerCostRepository: CenterCostRepository,
    @inject("CustomerRepository")
    private readonly customerRepository: CustomerRepositoryImpl,
    @inject("ExpenseRepository")
    private readonly expenseRepository: ExpenseRepository,
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @inject("SalesRepository")
    private readonly saleRepository: SaleRepository,
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ){}

  async execute({action ,initial_date, final_date, customer_id, salesman}: GetDataToRenderReport.Input): Promise<GetDataToRenderReport.Output> {

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
      return left(new AppError("Infome um período válido."))
    }
    //
    if(customers){
      const customers = await this.customerRepository.findAll()
      return right(customers)

    }else if(sales){

      const sales = (initial_date && final_date) ?
        await this.saleRepository.findByBetweenData(initial, final)
        : 
        await this.saleRepository.list("ASC")

      if(sales.length == 0 && (initial && final_date)){
        return left(new AppError("Não existem vendas registradas no período informado"))
      }

      let onNewSales: Sales[]
      if(customer_id && !salesman){

        onNewSales = sales.filter(sale => sale.customer_id == customer_id)

        if(onNewSales.length == 0 && (initial_date && final_date)){
          return left(new AppError("Não existem vendas registradaspara este cliente no período selecionado"))
        }
        else if(onNewSales.length == 0){
          return left(new AppError("Não existem vendas registradas no período informado"))
        }
        return right(onNewSales)

      }else if(salesman && !customer_id){

        onNewSales = sales.filter(sale => sale.salesman == salesman)
        if(onNewSales.length == 0 && (initial_date && final_date)){
          return left(new AppError("Não existem vendas registradas para este vendedor no período selecionado"))
        }
        else if(onNewSales.length == 0){
          return left(new AppError("Não existem vendas registradas no período informado"))
        }
        return right(onNewSales)

      }else if(customer_id && salesman){

        onNewSales = sales.filter(sale => sale.salesman == salesman)
        onNewSales = onNewSales.filter(sale => sale.customer_id == customer_id)
        if(onNewSales.length == 0 && (initial_date && final_date)){
          return left(new AppError("Não existem vendas registradas para este vendedor e cliente no período selecionado"))
        }
        else if(onNewSales.length == 0){
          return left(new AppError("Não existem vendas registradas no período informado"))
        }
        return right(onNewSales)
      }
      return right(sales)

    }else if(products){

      const products = await this.productRepository.list("ASC")
      return right(products)

    }else if(categories){

      const categories = await this.categoryRepository.list()
      return right(categories as any)

    }else if(centers_cost){

      const centers_cost = await this.centerCostRepository.list()
      return right(centers_cost as any)

    }else if(expenses){

      const expenses = (initial_date && final_date) ?
      await this.expenseRepository.findByBetweenData(initial, final)
      :
      await this.expenseRepository.findByDateOrder()

      if(expenses.length == 0 && (initial && final_date)){
        return left(new AppError("Não existem despesas registradas no período informado"))
      }
      return right(expenses as any)

    }else if(users){

      const users = await this.userRepository.findAll()
      return right(users)
    }

    return left(new AppError("Parametros de pesquisa não foram informados."))
    
  }
}
