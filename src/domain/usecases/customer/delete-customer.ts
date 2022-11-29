import { CustomerRepository } from "@/domain/contracts/repositories"
import { DeleteCustomer } from "@/domain/contracts/usecases"
import { Failure, RelationshipError } from "@/domain/errors"
import { left, right } from "@/shared/either" 

export class DeleteCustomerUseCase implements DeleteCustomer {
  constructor(
    private customerRepository: CustomerRepository,
  ) {}

  async execute({ id }: DeleteCustomer.Input): Promise<DeleteCustomer.Output> {
    const customer = await this.customerRepository.findById(id)
    if(!customer){
      return left(new Failure("Customer does not exists")) 
    }
    const success = await this.customerRepository.removeById(id)
    if(!success){
      return left(new RelationshipError())
    }
    return right("Success")
  }
}
