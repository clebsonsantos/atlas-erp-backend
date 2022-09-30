import { container } from 'tsyringe';

import { DeleteCustomerUseCase } from "@/modules/customers/usecases/delete-customer";
import { Request, Response } from "express";


export class DeleteCustomerController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteCustomer = container.resolve(DeleteCustomerUseCase)

    const result = await deleteCustomer.execute({id})

    if(result.isLeft()){
      return response.status(400).json(result.value)
    }

    return response.json(result.value)
  }
}