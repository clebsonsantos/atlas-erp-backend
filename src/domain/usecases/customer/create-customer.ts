import { left, right } from "@/shared/either" 
import { CreateCustomer } from "@/domain/contracts/usecases"
import { CustomerRepository } from "@/domain/contracts/repositories"
import { Document } from "@/infra/gateways"
import { AlreadyExists, InvalidFieldError, RequiredFieldError } from "@/domain/errors"

export class CreateCustomerUseCase implements CreateCustomer {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentValidator: Document
  ) {}

  async execute({full_name, cpf_cnpj, phone, ...data }: CreateCustomer.Input): Promise<CreateCustomer.Output> {
    
    if(!full_name){
      return left(new RequiredFieldError("phone"))
    } else if (!phone) {
      return left(new RequiredFieldError("phone"))
    }
    const isValid = this.documentValidator.validate(cpf_cnpj)
    if(isValid){
      if(await this.customerRepository.findByCpfCnpj(cpf_cnpj)){
        return left(new AlreadyExists("Customer"))
      }
    }else{
      return left(new InvalidFieldError("cpf_cnpj"))
    }
    const customer = await this.customerRepository.create({
      full_name,
      cpf_cnpj,
      phone,
      ...data
    })
    
    return right(customer)
  }
}
