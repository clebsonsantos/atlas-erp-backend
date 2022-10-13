import { CreateSaleAndAssociateProductsSold } from "../contracts/create-sale-and-associate-products-sold"
import { Sales } from "../infra/typeorm/entities/sale"

export interface SaleRepository {

  add(data: CreateSaleAndAssociateProductsSold.Params): Promise<Sales>
  findById(id: string): Promise<Sales>
  delete(id: string): Promise<boolean>
  findByName(name: string): Promise<Sales>
  list(): Promise<Sales[]>
  update(data: Sales): Promise<Sales>
}