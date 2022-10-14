import { CreateSaleAndAssociateProductsSold } from "../contracts/create-sale-and-associate-products-sold"
import { ProductSales } from "../infra/typeorm/entities/product-sale"

export interface ProductsSoldRepository {

  add(data: CreateSaleAndAssociateProductsSold.ProductsSoldParams): Promise<ProductSales>
  findById(id: string): Promise<ProductSales>
  delete(id: string): Promise<boolean>
  findByName(name: string): Promise<ProductSales>
  list(): Promise<ProductSales[]>
  update(data: ProductSales): Promise<ProductSales>
  findByIds(ids: string[]): Promise<ProductSales[]>
}