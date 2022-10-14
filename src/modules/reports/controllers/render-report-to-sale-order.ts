import { Request, Response } from "express" 
import { Sales } from "@/modules/sales/infra/typeorm/entities/sale" 
import { SalesRepository } from "@/repositories"
import { SalesOrderPrint } from "../SalesOrderPrint"


export class RenderReportToSaleOrderController {

  async handle(request: Request, response: Response) {
    const { id  } = request.params

    const Sales: Sales = await SalesRepository().findOne({id: id}, {relations:  ["products_sold", "customer"]})
    await (new SalesOrderPrint()).execute({Sales, response})
  }
}