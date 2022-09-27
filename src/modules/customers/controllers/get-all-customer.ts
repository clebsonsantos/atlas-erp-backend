
import { GetAllCustomersUseCase } from "@/modules/customers/usecases/get-all-customers";
import { Request, Response } from "express";



export class GetAllCustomersController {

  async handle(request: Request, response: Response) {
    const { id, full_name } = request.body
    const getAllCustomers = new GetAllCustomersUseCase()
    const result = await getAllCustomers.execute({ id, full_name })

    return response.status(200).json(result)
  }
}