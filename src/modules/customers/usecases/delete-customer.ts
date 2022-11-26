import { left, right } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { inject, injectable } from "tsyringe" 
import { DeleteCustomer } from "../contracts/delete-customer" 
import { ICustomerRepository } from "../repositories/icustomer-repository" 

@injectable()
export class DeleteCustomerUseCase {
  
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ id }: DeleteCustomer.Input): Promise<DeleteCustomer.Output> {
    const customer = await this.customerRepository.findById(id)

    if(!customer){
      return left(new AppError("Cliente não encontrado.", 404)) 
    }

    const success = await this.customerRepository.removeById(id)

    if(!success){
      return left(new AppError("Ocorreu um erro ao deletar esse registro. Verifique se há relacionamentos que dependem dele ou tente novamente."))
    }
    return right("Cliente deletado com sucesso")
    
  }
}
