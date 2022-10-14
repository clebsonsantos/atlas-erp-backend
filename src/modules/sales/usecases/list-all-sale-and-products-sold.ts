import { inject } from "tsyringe"
import { Sales } from "../infra/typeorm/entities/sale" 
import { SaleRepository } from "../repositories/sales-repository"

export class ListAllSalesAndProductsUseCase  {
  constructor(
  @inject("SaleRepository")
  private readonly saleRepository: SaleRepository
  ){}
  
  async execute(): Promise<Sales[]>{
    const sales = await this.saleRepository.list()
    return sales
  }
}
