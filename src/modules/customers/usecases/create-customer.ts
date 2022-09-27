import { CustomerRepository } from "@/repositories";
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { Customers } from "@/modules/customers/infra/typeorm/entities/customer";


type ICustomers = {
  full_name: string;
  cpf_cnpj: string;
  state_registration: number;
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
    if(!full_name || !phone){
      return new Error ("Nome completo e telefone são campos obrigatórios.")

    }
    if(cpf_cnpj.length > 1){
      const isValid = cpf.isValid(cpf_cnpj) ? cpf.isValid(cpf_cnpj) : cnpj.isValid(cpf_cnpj) 
      if(isValid){
        if(await CustomerRepository().findOne({cpf_cnpj: cpf_cnpj})){
          return new Error ("Este Cliente já existe.")
        }
      }else{
       return new Error("Insira um cpf/cnpj válido.")
      }
    }
    await CustomerRepository().save(customer)

    return customer
  }
}
