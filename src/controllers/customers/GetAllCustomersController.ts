
import { Request, Response } from "express";
import { GetAllCustomersUseCase } from '../../usecases/customers/GetAllCustomersUseCase';



export class GetAllCustomersController {

  async handle(request: Request, response: Response) {
    const getAllCustomers = new GetAllCustomersUseCase()
    const result = await getAllCustomers.execute()

    return response.status(200).json(result)
  }
}