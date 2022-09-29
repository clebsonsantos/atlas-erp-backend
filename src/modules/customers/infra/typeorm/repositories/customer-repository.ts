import { CreateCustomer } from "@/modules/customers/contracts/create-customer";
import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository";
import { getRepository, Repository } from "typeorm"
import { Customers } from "../entities/customer";

export class CustomerRepository implements ICustomerRepository {
  private repository: Repository<Customers>
  constructor() {
    this.repository = getRepository(Customers)
  }
  async create({ full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: CreateCustomer.Params): Promise<Customers> {
    const customer = this.repository.create({
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
    const customerCreated = await this.repository.save(customer)
    return customerCreated
  }
  async findByCpfCnpj(cpfCnpj: string): Promise<Customers> {
    const customer = await this.repository.findOne({ cpf_cnpj: cpfCnpj })
    return customer
  }
}