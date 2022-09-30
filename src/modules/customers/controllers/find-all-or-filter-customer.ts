import { container } from 'tsyringe';

import { FindAllCustomersUseCase } from "@/modules/customers/usecases/find-all-customers-or-filter-by-name-or-id";
import { Request, Response } from "express";


export class FindAllOrFilterCustomersController {

  async handle(request: Request, response: Response) {
    const { id, full_name } = request.body
    const getAllCustomers = container.resolve(FindAllCustomersUseCase)
    
    const result = await getAllCustomers.execute({ id, full_name })

    return response.status(200).json(result)
  }
}