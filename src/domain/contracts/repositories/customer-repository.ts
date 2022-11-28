import { CustomerDTO } from "@/domain/entities"
import { CreateCustomer, UpdateCustomer } from "@/domain/contracts/usecases"

export interface CustomerRepository {
  create: (data: CreateCustomer.Input) => Promise<CustomerDTO>
  findByCpfCnpj: (cpfCnpj: string) => Promise<CustomerDTO>
  findById: (id: string) => Promise<CustomerDTO>
  removeById: (id: string) => Promise<boolean>
  findByFullName: (fullName: string) => Promise<CustomerDTO>
  findAll: () => Promise<CustomerDTO[]>
  updatedCustomer: (data: UpdateCustomer.Input) => Promise<CustomerDTO>
}
