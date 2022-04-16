import { Request, Response } from "express";
import { Category } from '../../entities/Category';
import { CentersCost } from '../../entities/CentersCost';
import { Customers } from '../../entities/Customers';
import { Expenses } from '../../entities/Expenses';
import { Product } from '../../entities/Product';
import { Sales } from '../../entities/Sales';
import { User } from '../../entities/User';
import { CategoriesCenterReports } from '../../usecases/reports/CategoriesCenterReports';
import { CustomersReports } from '../../usecases/reports/CustomersReports';
import { ExpensesReports } from '../../usecases/reports/ExpensesReports';
import { GetReportsUseCase } from '../../usecases/reports/GetReportsUseCase';
import { ProductsReports } from '../../usecases/reports/ProductsReports';
import { UsersReports } from '../../usecases/reports/UsersReports';
import { SalesReports } from './../../usecases/reports/SalesReports';



export class GetReportsController {

  async handle(request: Request, response: Response) {

    const { action, initial_date, final_date, center_cost, customer_id } = request.query
    const getReports = new GetReportsUseCase()

    const time_course: string = (initial_date && final_date) 
      ? `Período: ${new Date(initial_date.toString()).toLocaleDateString()} até ${new Date(final_date.toString()).toLocaleDateString()}`
      : ""
    const customer_find: string = customer_id ? customer_id.toString() : ''

      const reports = await getReports.execute({action, initial_date, final_date, customer_id})

      if(reports instanceof Error){
        return response.status(400).json(reports.message)
      }

      const instaceType = reports[0]

      if(instaceType instanceof Customers ){
        await (new CustomersReports()).execute(reports as Customers[], response)
      }
      if(instaceType instanceof User ){
        await (new UsersReports()).execute(reports as User[], response)
      }
      if(instaceType instanceof Expenses ){

        await (new ExpensesReports()).execute(reports as Expenses[], center_cost, time_course, response)
      }
      if(instaceType instanceof Sales ){
        await (new SalesReports()).execute(reports as Sales[], time_course, customer_find, response)
      }
      if(instaceType instanceof Product ){
        await (new ProductsReports()).execute(reports as Product[], response)
      }
      if(instaceType instanceof CentersCost ){
        await (new CategoriesCenterReports()).execute(reports as CentersCost[], response)
      }
      if(instaceType instanceof Category ){
        await (new CategoriesCenterReports()).execute(reports as Category[], response)
      }
  }
}