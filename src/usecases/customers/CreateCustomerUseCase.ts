import { Customers } from '../../entities/Customers';
import { CustomerRepository } from '../../repositories';

type ICustomers = {
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

export class CreateCustomerUseCase  {

  async execute({full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: ICustomers): Promise< Customers | Error> {

    const customer = CustomerRepository().create({
      full_name,
      cpf_cnpj,
      state_registration,
      phone,
      email,
      state,
      city,
      address,
      zip_code 
    })
    if(!cpf_cnpj || !full_name){
      return new Error ("full_name e cpf_cnpj são campos obrigatórios.")

    }

    if(await CustomerRepository().findOne({cpf_cnpj: cpf_cnpj})){
      return new Error ("Este Cliente já existe.")

    }
    await CustomerRepository().save(customer)

    return customer
  }
}
