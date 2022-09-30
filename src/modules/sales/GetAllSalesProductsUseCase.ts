import { SalesRepository } from '../../repositories';
import { Sales } from "./infra/typeorm/entities/sale";

export class GetAllSalesProductsUseCase  {

  async execute(): Promise<Sales[]>{

    const sales = await SalesRepository().find({relations: ["products_sold", "customer"], order: {created_at: "DESC"}})
    return sales
    
  }
}
