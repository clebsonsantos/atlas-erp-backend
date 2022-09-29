import { inject, injectable } from "tsyringe";
import { FindAllCustomerOrFilter } from "../contracts/find-all-or-filter-customer";
import { ICustomerRepository } from "../repositories/icustomer-repository";

@injectable()
export class FindAllCustomersUseCase  {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

    async execute({ id, full_name }: FindAllCustomerOrFilter.Params): Promise<FindAllCustomerOrFilter.Result> {
      const findByParams = id ? await this.customerRepository.findById(id) : await this.customerRepository.findByFullName(full_name)
      const useThisParams = id ? id : full_name

      const customers = useThisParams ? findByParams :  await this.customerRepository.findAll()
      return customers
    }
    
}
