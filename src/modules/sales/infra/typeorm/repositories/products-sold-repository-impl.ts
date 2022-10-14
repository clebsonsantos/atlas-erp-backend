import { CreateSaleAndAssociateProductsSold } from "@/modules/sales/contracts/create-sale-and-associate-products-sold";
import { ProductsSoldRepository } from "@/modules/sales/repositories/product-sold-repository";
import { getRepository, Repository } from "typeorm";
import { ProductSales } from "../entities/product-sale";

export class ProductsSoldsRepositoryImpl implements ProductsSoldRepository {

  private readonly repository: Repository<ProductSales>
  constructor(){
    this.repository = getRepository(ProductSales)
  }

  async add(data: CreateSaleAndAssociateProductsSold.ProductsSoldParams): Promise<ProductSales> {
    const productSold = this.repository.create(data)
    return await this.repository.save(productSold)
  }
  async findById(id: string): Promise<ProductSales> {
    return await this.repository.findOne({ id })
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete({ id })
      return true
    } catch {
      return false
    }
  }
  async list(): Promise<ProductSales[]> {
    return await this.repository.find()
  }
  async update(data: ProductSales): Promise<ProductSales> {
    return await this.repository.save(data)
  }
  async findByIds(ids: string[]): Promise<ProductSales[]> {
    return await this.repository.findByIds(ids)
  }
}