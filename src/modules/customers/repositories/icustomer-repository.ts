import { CreateCustomer } from "../contracts/create-customer" 
import { UpdateCustomer } from "../contracts/updated-customer" 
import { Customer } from "../infra/typeorm/entities/customer" 

export interface ICustomerRepository {
  create: (data: CreateCustomer.Params) => Promise<Customer>
  findByCpfCnpj: (cpfCnpj: string) => Promise<Customer>
  findById: (id: string) => Promise<Customer>
  removeById: (id: string) => Promise<boolean>
  findByFullName: (fullName: string) => Promise<Customer>
  findAll: () => Promise<Customer[]>
  updatedCustomer: (data: UpdateCustomer.Params) => Promise<Customer>
}
