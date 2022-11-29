import { CustomerRepository } from "@/domain/contracts/repositories"
import { UpdateCustomer } from "@/domain/contracts/usecases"
import { Failure } from "@/domain/errors"
import { left, right } from "@/shared/either" 

export class UpdateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepository,
  ) {}

  async execute({ id, full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: UpdateCustomer.Input): Promise<UpdateCustomer.Output> {
    const customer = await this.customerRepository.findById(id)
    if(!customer){
      return left(new Failure('Customer does not exists'))
    }
    customer.full_name = full_name ? full_name : customer.full_name 
    customer.cpf_cnpj = cpf_cnpj ? cpf_cnpj : customer.cpf_cnpj 
    customer.state_registration = state_registration ? state_registration : customer.state_registration 
    customer.phone = phone ? phone : customer.phone 
    customer.email = email ? email  : customer.email 
    customer.state = state ? state  : customer.state 
    customer.city = city ? city : customer.city 
    customer.address = address ? address : customer.address 
    customer.zip_code = zip_code ? zip_code : customer.zip_code 
    const result = await this.customerRepository.updatedCustomer(customer)
    return right(result)
  }
}
