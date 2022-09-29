import { CreateCustomer } from "../contracts/create-customer";
import { Customers } from "../infra/typeorm/entities/customer";

export interface ICustomerRepository {
  create: (data: CreateCustomer.Params) => Promise<Customers>
  findByCpfCnpj: (cpfCnpj: string) => Promise<Customers>
}
