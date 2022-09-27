import { Customers } from "@/modules/customers/infra/typeorm/entities/customer";
import { CustomerRepository } from "@/repositories";

namespace GetAllCustomersUseCase {
  export type Params = {
    id?: string;
    full_name?: string
  }
  export type Result =  Customers[] | Customers
}

export class GetAllCustomersUseCase  {

    async execute({ id, full_name }: GetAllCustomersUseCase.Params): Promise<GetAllCustomersUseCase.Result> {
      const findByParams = id ? await CustomerRepository().findOne({ id }) : await CustomerRepository().findOne({ full_name })
      const paramsFind = id ? id : full_name

      const customers = paramsFind ? findByParams :  await CustomerRepository().find({order: {full_name: "ASC"}})
      return customers
    }
    
}
