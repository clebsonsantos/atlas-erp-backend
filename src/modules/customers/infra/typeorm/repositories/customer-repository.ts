import { CreateCustomer } from "@/modules/customers/contracts/create-customer" 
import { UpdateCustomer } from "@/modules/customers/contracts/updated-customer" 
import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository" 
import { getRepository, Repository } from "typeorm"
import { Customer } from "../entities/customer" 

export class CustomerRepository implements ICustomerRepository {
  
  private repository: Repository<Customer>
  constructor() {
    this.repository = getRepository(Customer)
  }
  
  async create({ full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: CreateCustomer.Input): Promise<Customer> {
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

  async findByCpfCnpj(cpfCnpj: string): Promise<Customer> {
    const customer = await this.repository.findOne({ cpf_cnpj: cpfCnpj })
    return customer
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repository.findOne({ id })
    return customer
  }

  async removeById(id: string): Promise<boolean> {
    try {
      await this.repository.delete({ id })
      return true
    } catch(error) {
      return false
    }
  }

  async findByFullName(fullName: string): Promise<Customer> {
    const customer = await this.repository.findOne({ full_name: fullName })
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.repository.find({
      order: {
        full_name: "ASC"
      }
    })
    return customers
  }

  async updatedCustomer(customer: UpdateCustomer.Input): Promise<Customer> {
    const result = await this.repository.save(customer)
    return result
  }
}