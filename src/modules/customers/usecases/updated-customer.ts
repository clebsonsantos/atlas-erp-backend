import { left, right } from "@/shared/either";
import { inject, injectable } from "tsyringe";
import { UpdateCustomer } from "../contracts/updated-customer";
import { ICustomerRepository } from "../repositories/icustomer-repository";

@injectable()
export class UpdateCustomerUseCase  {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

    async execute({ id, full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: UpdateCustomer.Params): Promise<UpdateCustomer.Result> {

      const customer = await this.customerRepository.findById(id)
  
      if(!customer){
        return left(new Error('Cliente não existe.'))
      }
  
      customer.full_name = full_name ? full_name : customer.full_name;
      customer.cpf_cnpj = cpf_cnpj ? cpf_cnpj : customer.cpf_cnpj;
      customer.state_registration = state_registration ? state_registration : customer.state_registration;
      customer.phone = phone ? phone : customer.phone;
      customer.email = email ? email  : customer.email;
      customer.state = state ? state  : customer.state;
      customer.city = city ? city : customer.city;
      customer.address = address ? address : customer.address;
      customer.zip_code = zip_code ? zip_code : customer.zip_code;
  
      const result = await this.customerRepository.updatedCustomer(customer)
  
      return right(result)
    }
    
}
