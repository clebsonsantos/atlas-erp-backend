import { Request, Response } from "express" 

import { ReportToCategoryAndCenter } from '@/modules/reports/usecases/report-to-category-and-center' 
import { ReportToCustomer } from '@/modules/reports/usecases/report-to-customer' 
import { ReportToExpenses } from '@/modules/reports/usecases/report-to-expense' 
import { GetReportsUseCase } from '@/modules/reports/GetReportsUseCase' 
import { ReportToUser } from '@/modules/reports/usecases/report-to-user' 
import { Customer } from "@/modules/customers/infra/typeorm/entities/customer" 
import { User } from "@/modules/user/infra/typeorm/entities/user" 
import { Expenses } from "@/modules/expenses/infra/typeorm/entities/expense" 
import { Sales } from "@/modules/sales/infra/typeorm/entities/sale" 
import { Product } from "@/modules/products/infra/typeorm/entities/product" 
import { CentersCost } from "@/modules/expenses/infra/typeorm/entities/center-cost" 
import { Category } from "@/modules/expenses/infra/typeorm/entities/category" 
import { container } from "tsyringe"
import { ReportToProducts } from "../usecases/report-to-products"
import { ReportToSale } from "../usecases/report-to-sale"



export class RenderReportByConditioncontroller {

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
        await (new ReportToCustomer()).execute(reports as Customer[], response)
      }
      if(instaceType instanceof User ){
        await (new ReportToUser()).execute(reports as User[], response)
      }
      if(instaceType instanceof Expenses ){
        const reportToExpense = container.resolve(ReportToExpenses)
        await reportToExpense.execute(reports as Expenses[], center_cost, time_course, response)
      }
      if(instaceType instanceof Sales ){
        const reportToSale = container.resolve(ReportToSale)
        await reportToSale.execute(reports as Sales[], time_course, customer_find, salesman, response)
      }
      if(instaceType instanceof Product ){
        await (new ReportToProducts()).execute(reports as Product[], response)
      }
      if(instaceType instanceof CentersCost ){
        await (new ReportToCategoryAndCenter()).execute(reports as CentersCost[], response)
      }
      if(instaceType instanceof Category ){
        await (new ReportToCategoryAndCenter()).execute(reports as Category[], response)
      }
  }
}