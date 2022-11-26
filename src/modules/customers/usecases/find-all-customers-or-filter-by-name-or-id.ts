import { inject, injectable } from "tsyringe" 
import { FindAllCustomerOrFilter } from "../contracts/find-all-or-filter-customer" 
import { ICustomerRepository } from "../repositories/icustomer-repository" 

@injectable()
export class FindAllCustomersUseCase {
  
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

    async execute({ id, full_name }: FindAllCustomerOrFilter.Input): Promise<FindAllCustomerOrFilter.Output> {
      const findByInput = id ? await this.customerRepository.findById(id) : await this.customerRepository.findByFullName(full_name)
      const useThisInput = id ? id : full_name

      const customers = useThisInput ? findByInput :  await this.customerRepository.findAll()
      return customers
    }
    
}
