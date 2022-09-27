
import { Request, Response } from "express";
import { DeleteCustomerUseCase } from '../../modules/customers/DeleteCustomerUseCase';



export class DeleteCustomerController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteCustomer = new DeleteCustomerUseCase()

    const result = await deleteCustomer.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json("Cliente deletado com sucesso!")
  }
}