
import { Request, Response } from "express";
import { GetAllSalesProductsUseCase } from '../../usecases/sales/GetAllSalesProductsUseCase';



export class GettAllSaleProductsController {

  async handle(request: Request, response: Response) {

    const getAllSales = new GetAllSalesProductsUseCase();

    const sales = await getAllSales.execute();

    return response.json(sales);
  }
}