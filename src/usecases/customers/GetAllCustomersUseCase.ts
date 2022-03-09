import { Customers } from '../../entities/Customers';
import { CustomerRepository } from "../../repositories";

export class GetAllCustomersUseCase  {

    async execute(): Promise< Customers[]> {
      const customers = await CustomerRepository().find()
      return customers
    }
    
}
