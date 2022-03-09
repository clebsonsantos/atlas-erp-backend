import { Customers } from '../../entities/Customers';
import { CustomerRepository } from '../../repositories';

type ICustomers = {
  id: string
  full_name: string;
  cpf_cnpj: string;
  state_registration: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  address: string;
  zip_code: string
}



export class UpdateCustomerUseCase  {

    async execute({id, full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: ICustomers): Promise< Customers | Error> {

      const customerRepository = CustomerRepository() 

      const customer = await customerRepository.findOne({id})
  
      if(!customer){
        return new Error('Cliente não existe.')
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
  
      customerRepository.save(customer)
  
      return customer
    }
    
}
