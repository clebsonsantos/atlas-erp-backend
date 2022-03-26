
import { Request, Response } from "express";
import { Category } from '../../entities/Category';
import { CentersCost } from '../../entities/CentersCost';
import { Customers } from '../../entities/Customers';
import { Expenses } from '../../entities/Expenses';
import { Product } from '../../entities/Product';
import { Sales } from '../../entities/Sales';
import { User } from '../../entities/User';
import { GetReportsUseCase } from '../../usecases/reports/GetReportsUseCase';
import { UsersReports } from '../../usecases/reports/UsersReports';



export class GetReportsController {

  async handle(request: Request, response: Response) {
    const {   
      customers,  
      sales,  
      products,  
      categories,  
      centers_cost,  
      expenses,  
      users,  
      initial_date,  
      final_date
      } = request.body;

      const getReports = new GetReportsUseCase()

      const reports = await getReports.execute({   
        customers,  
        sales,  
        products,  
        categories,  
        centers_cost,  
        expenses,  
        users,  
        initial_date,  
        final_date
        })
      if(reports instanceof Error){
        return response.status(400).json(reports.message)
      }

      const instaceType = reports[0]

      if(instaceType instanceof Customers ){
        return response.json(reports)
      }
      if(instaceType instanceof User ){
        const user_report = await (new UsersReports()).execute(reports as User[])
        return response.json(user_report)
      }
      if(instaceType instanceof Expenses ){
        return response.json(reports)
      }
      if(instaceType instanceof Sales ){
        return response.json(reports)
      }
      if(instaceType instanceof Product ){
        return response.json(reports)
      }
      if(instaceType instanceof CentersCost ){
        return response.json(reports)
      }
      if(instaceType instanceof Category ){
        return response.json(reports)
      }
  }
}