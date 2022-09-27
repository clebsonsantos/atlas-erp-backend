
import { Request, Response } from "express";
import { UpdateCustomerUseCase } from '../../modules/customers/UpdateCustomerUseCase';


export class UpdateCustomerController {

  async handle(request: Request, response: Response) {
    const {full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code } = request.body
    const { id } = request.params

    const customer = new UpdateCustomerUseCase()

    const result = await customer.execute({id, full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code  })

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }
}