import { CustomerRepository } from "@/domain/contracts/repositories"
import { FindAllCustomerOrFilter } from "@/domain/contracts/usecases"

export class FindAllCustomersUseCase implements FindAllCustomerOrFilter {
  constructor(
    private customerRepository: CustomerRepository,
  ) {}

  async execute({ id, full_name }: FindAllCustomerOrFilter.Input): Promise<FindAllCustomerOrFilter.Output> {
    const findByInput = id ? await this.customerRepository.findById(id) : await this.customerRepository.findByFullName(full_name)
    const useThisInput = id ? id : full_name
    const customers = useThisInput ? findByInput :  await this.customerRepository.findAll()
    return customers
  }
}
