
import { CreateCustomerUseCase } from "@/modules/customers/usecases/create-customer" 
import { Request, Response } from "express" 
import { container } from "tsyringe" 

export class CreateCustomerController {

  async handle(request: Request, response: Response) {
    const {full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code } = request.body

    const customerService = container.resolve(CreateCustomerUseCase)

    const result = await customerService.execute({full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code})

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.json(result.value)
  }
}