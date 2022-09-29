import { left, right } from "@/shared/either";
import { inject, injectable } from "tsyringe";
import { DeleteCustomer } from "../contracts/delete-customer";
import { ICustomerRepository } from "../repositories/icustomer-repository";

@injectable()
export class DeleteCustomerUseCase  {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ id }: DeleteCustomer.Params){
    const customer = await this.customerRepository.findById(id)

    if(!customer){
      return left(new Error("Cliente não encontrado."));
    }

    const success = await this.customerRepository.removeById(id)

    if(!success){
      return left(new Error("Ocorreu um erro ao deletar esse registro. Verifique se há relacionamentos que dependem dele ou tente novamente."))
    }
    return right("Cliente deletado com sucesso")
    
  }
}
