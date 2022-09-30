import { container } from 'tsyringe';

import { UpdateCustomerUseCase } from "@/modules/customers/usecases/updated-customer";
import { Request, Response } from "express";


export class UpdateCustomerController {

  async handle(request: Request, response: Response) {
    const {
      full_name,
      cpf_cnpj,
      state_registration,
      phone,
      email,
      state,
      city,
      address,
      zip_code
    } = request.body
    
    const { id } = request.params

    const customerService = container.resolve(UpdateCustomerUseCase)

    const result = await customerService.execute({
      id,
      full_name,
      cpf_cnpj,
      state_registration,
      phone,
      email,
      state,
      city,
      address,
      zip_code
    })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.status(200).json(result.value)
  }
}