import { Sales } from '../../entities/Sales';
import { SalesRepository } from '../../repositories';

export class GetAllSalesProductsUseCase  {

  async execute(): Promise<Sales[]>{

    const sales = await SalesRepository().find({relations: ["products_sold", "customer"]})
    return sales
    
  }
}
