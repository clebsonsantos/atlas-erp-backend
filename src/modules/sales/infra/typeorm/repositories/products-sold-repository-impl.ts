import { CreateSaleAndAssociateProductsSold } from "@/modules/sales/contracts/create-sale-and-associate-products-sold";
import { ProductsSoldRepository } from "@/modules/sales/repositories/product-sold-repository";
import { ProductSales } from "../entities/product-sale";

export class ProductsSoldsRepositoryImpl implements ProductsSoldRepository {

  async add(data: CreateSaleAndAssociateProductsSold.ProductsSoldParams): Promise<ProductSales> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<ProductSales> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string): Promise<ProductSales> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<ProductSales[]> {
    throw new Error("Method not implemented.");
  }
  async update(data: ProductSales): Promise<ProductSales> {
    throw new Error("Method not implemented.");
  }

}