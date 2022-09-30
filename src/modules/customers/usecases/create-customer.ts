import { cnpj, cpf } from 'cpf-cnpj-validator';
import { left, right } from "@/shared/either";
import { CreateCustomer } from "../contracts/create-customer";
import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../repositories/icustomer-repository";
import { AppError } from "@/shared/errors/AppError";

@injectable()
export class CreateCustomerUseCase  {
  
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: CreateCustomer.Params): Promise<CreateCustomer.Result> {
    
    if(!full_name || !phone){
      return left(new AppError("Nome completo e telefone são campos obrigatórios."))
      
    }
    if(cpf_cnpj.length){
      const isValid = cpf.isValid(cpf_cnpj) ? cpf.isValid(cpf_cnpj) : cnpj.isValid(cpf_cnpj) 
      if(isValid){
        if(await this.customerRepository.findByCpfCnpj(cpf_cnpj)){
          return left(new AppError("Este Cliente já existe."))
        }
      }else{
       return left(new AppError("Insira um cpf/cnpj válido."))
      }
    }
    const customer = await this.customerRepository.create({
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
    
    return right(customer)
  }
}
