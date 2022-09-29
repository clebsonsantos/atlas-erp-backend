import { Request, Response } from "express";
import { Category } from '../../entities/Category';
import { CentersCost } from '../../entities/CentersCost';
import { Expenses } from '../../entities/Expenses';
import { Product } from '../../entities/Product';
import { Sales } from '../../entities/Sales';
import { User } from '../../entities/User';
import { CategoriesCenterReports } from '../../modules/reports/CategoriesCenterReports';
import { CustomersReports } from '../../modules/reports/CustomersReports';
import { ExpensesReports } from '../../modules/reports/ExpensesReports';
import { GetReportsUseCase } from '../../modules/reports/GetReportsUseCase';
import { ProductsReports } from '../../modules/reports/ProductsReports';
import { UsersReports } from '../../modules/reports/UsersReports';
import { SalesReports } from '../../modules/reports/SalesReports';
import { Customer } from "@/modules/customers/infra/typeorm/entities/customer";



export class GetReportsController {

  async handle(request: Request, response: Response) {

    const { action, initial_date, final_date, center_cost, customer_id, salesman } = request.query
    const getReports = new GetReportsUseCase()

    const time_course: string = (initial_date && final_date) 
      ? `\n\nPeríodo: ${new Date(initial_date.toString()).toLocaleDateString('pt-BR')} até ${new Date(final_date.toString()).toLocaleDateString('pt-BR')}`
      : ""
    const customer_find: string = customer_id ? customer_id.toString() : ''

      const reports = await getReports.execute({action, initial_date, final_date, customer_id, salesman})

      if(reports instanceof Error){
        return response.status(400).json(reports.message)
      }

      const instaceType = reports[0]

      if(instaceType instanceof Customer ){
        await (new CustomersReports()).execute(reports as Customer[], response)
      }
      if(instaceType instanceof User ){
        await (new UsersReports()).execute(reports as User[], response)
      }
      if(instaceType instanceof Expenses ){

        await (new ExpensesReports()).execute(reports as Expenses[], center_cost, time_course, response)
      }
      if(instaceType instanceof Sales ){
        await (new SalesReports()).execute(reports as Sales[], time_course, customer_find, salesman, response)
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