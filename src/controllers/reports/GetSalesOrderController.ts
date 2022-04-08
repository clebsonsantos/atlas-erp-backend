import { SalesRepository } from './../../repositories/index';
import { Request, Response } from "express";
import { SalesOrderPrint } from '../../usecases/reports/SalesOrderPrint';
import { Sales } from '../../entities/Sales';


export class GetSalesOrderController {

  async handle(request: Request, response: Response) {
    const { id  } = request.params

    const Sales: Sales = await SalesRepository().findOne({id: id}, {relations:  ["products_sold", "customer"]})

    await (new SalesOrderPrint()).execute({Sales, response})
  }
}