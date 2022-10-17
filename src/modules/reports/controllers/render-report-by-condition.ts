import { Request, Response } from "express"

import { ReportToCategoryAndCenter } from "@/modules/reports/usecases/report-to-category-and-center"
import { ReportToCustomer } from "@/modules/reports/usecases/report-to-customer"
import { ReportToExpenses } from "@/modules/reports/usecases/report-to-expense"
import { ReportToUser } from "@/modules/reports/usecases/report-to-user"
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
import { GetDataToRenderReportUseCase } from "../usecases/get-data-to-render-report-by-conditions"
import { SendReportByLayoutDefaults } from "../usecases/send-report-by-layout-defaults"
import { SendReportPdfToClientSide } from "../adapters/send-report-pdf-to-client-side"
import { DefaultConfigReport } from "../contracts/defaults-config-reports"

export class RenderReportByConditioncontroller {
  async handle(request: Request, response: Response) {

    const {
      action,
      initial_date,
      final_date,
      center_cost,
      customer_id,
      salesman,
    } = request.query


    const time_course: string =
      initial_date && final_date
        ? `\n\nPeríodo: ${new Date(initial_date.toString()).toLocaleDateString(
            "pt-BR"
          )} até ${new Date(final_date.toString()).toLocaleDateString("pt-BR")}`
        : ""
    const customer_find: string = customer_id ? customer_id.toString() : ""

    const reportsService = container.resolve(GetDataToRenderReportUseCase)

    const errorOrData = await reportsService.execute({
      action,
      initial_date,
      final_date,
      customer_id,
      salesman,
    })

    if (errorOrData.isLeft()) {
      return response.status(errorOrData.value.statusCode).json(errorOrData.value)
    }
    
    const sendReportByLayoutDefaults = container.resolve(SendReportByLayoutDefaults)
    const instaceType = errorOrData.value[0]
    const reports = errorOrData.value

    let definitionsToSend: DefaultConfigReport.Result

    if (instaceType instanceof Customer) {

      const reportCustomer = new ReportToCustomer()
      const docsDefinitions = await reportCustomer.execute(reports as Customer[])
      definitionsToSend = await sendReportByLayoutDefaults.execute(docsDefinitions)

    } else if (instaceType instanceof User) {

      await new ReportToUser().execute(reports as User[], response)

    } else if (instaceType instanceof Expenses) {

      const reportToExpense = container.resolve(ReportToExpenses)
      
      const docsDefinitions = await reportToExpense.execute(
        reports as Expenses[],
        center_cost,
        time_course
      )

      definitionsToSend = await sendReportByLayoutDefaults.execute(docsDefinitions)

    } else if (instaceType instanceof Sales) {

      const reportToSale = container.resolve(ReportToSale)
      const docsDefinitions = await reportToSale.execute(
        reports as Sales[],
        time_course,
        customer_find,
        salesman,
      )
      
      definitionsToSend = await sendReportByLayoutDefaults.execute(docsDefinitions)

    } else if (instaceType instanceof Product) {

      const reportProducts =  new ReportToProducts()
      const docsDefinitions = await reportProducts.execute(reports as Product[])
      definitionsToSend = await sendReportByLayoutDefaults.execute(docsDefinitions)

    } else if (instaceType instanceof CentersCost) {

      const reportCenter =  new ReportToCategoryAndCenter()
      const docsDefinitions = await reportCenter.execute(reports as CentersCost[])
      definitionsToSend = await sendReportByLayoutDefaults.execute(docsDefinitions)

    } else if (instaceType instanceof Category) {

      const reportCategory =  new ReportToCategoryAndCenter()
      const docsDefinitions = await reportCategory.execute(reports as Category[])
      definitionsToSend = await sendReportByLayoutDefaults.execute(docsDefinitions)
    }

    if (definitionsToSend.isLeft()) {
      return response.status(definitionsToSend.value.statusCode).json(definitionsToSend.value)
    }
    const sendToClientSide = new SendReportPdfToClientSide()
    await sendToClientSide.execute({ response, docDefinitions: definitionsToSend.value})
  }
}
