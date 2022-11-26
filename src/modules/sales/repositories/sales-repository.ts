import { CreateSaleAndAssociateProductsSold } from "../contracts/create-sale-and-associate-products-sold"
import { Sales } from "../infra/typeorm/entities/sale"

export interface SaleRepository {

  add(data: CreateSaleAndAssociateProductsSold.Input): Promise<Sales>
  findById(id: string): Promise<Sales>
  delete(id: string): Promise<boolean>
  list(order?: "ASC" | "DESC"): Promise<Sales[]>
  update(data: Sales): Promise<Sales>
  findByBetweenData(startDate: Date, endDate: Date): Promise<Sales[]>
}