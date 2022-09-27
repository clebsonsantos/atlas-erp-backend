import { Customers } from "@/entities/Customers";
import { CustomerRepository } from "@/repositories";


type FindCustomer = {
  id?: string;
  full_name?: string
}

export class GetAllCustomersUseCase  {

    async execute({ id, full_name }:FindCustomer): Promise< Customers[] | Customers> {
      const findByParams = id ? await CustomerRepository().findOne({ id }) : await CustomerRepository().findOne({ full_name })
      const paramsFind = id ? id : full_name

      const customers = paramsFind ? findByParams :  await CustomerRepository().find({order: {full_name: "ASC"}})
      return customers
    }
    
}
