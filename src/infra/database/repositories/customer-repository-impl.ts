import { CustomerRepository } from "@/domain/contracts/repositories"
import { CreateCustomer, UpdateCustomer } from "@/domain/contracts/usecases"
import { Customer } from "@/infra/database/entities"
 
import { getRepository } from "typeorm"

export class CustomerRepositoryImpl implements CustomerRepository {
  
  async create({ full_name, cpf_cnpj, state_registration, phone, email, state, city, address, zip_code }: CreateCustomer.Input): Promise<Customer> {
    const repository = getRepository(Customer)
    const customer = repository.create({ 
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
    const customerCreated = await repository.save(customer)
    return customerCreated
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Customer> {
    const repository = getRepository(Customer)
    const customer = await repository.findOne({ cpf_cnpj: cpfCnpj })
    return customer
  }

  async findById(id: string): Promise<Customer> {
    const repository = getRepository(Customer)
    const customer = await repository.findOne({ id })
    return customer
  }

  async removeById(id: string): Promise<boolean> {
    const repository = getRepository(Customer)
    try {
      await repository.delete({ id })
      return true
    } catch(error) {
      return false
    }
  }

  async findByFullName(fullName: string): Promise<Customer> {
    const repository = getRepository(Customer)
    const customer = await repository.findOne({ full_name: fullName })
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const repository = getRepository(Customer)
    const customers = await repository.find({
      order: {
        full_name: "ASC"
      }
    })
    return customers
  }

  async updatedCustomer(customer: UpdateCustomer.Input): Promise<Customer> {
    const repository = getRepository(Customer)
    const result = await repository.save(customer)
    return result
  }
}