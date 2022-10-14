import { CreateSaleAndAssociateProductsSold } from "@/modules/sales/contracts/create-sale-and-associate-products-sold";
import { SaleRepository } from "@/modules/sales/repositories/sales-repository";
import { getRepository, Repository } from "typeorm";
import { Sales } from "../entities/sale";


export class SaleRepositoryImpl implements SaleRepository {

  private readonly repository: Repository<Sales>
  constructor(){
    this.repository = getRepository(Sales)
  }

  async add(data: CreateSaleAndAssociateProductsSold.Params): Promise<Sales> {
    const sale = this.repository.create(data)
    return await this.repository.save(sale)
  }

  async findById(id: string): Promise<Sales> {
    return await this.repository.findOne({ id }, { relations: ["products_sold"] })
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete({ id })
      return true
    } catch {
      return false
    }
  }

  async list(): Promise<Sales[]> {
    return await this.repository.find()
  }

  async update(data: Sales): Promise<Sales> {
    return await this.repository.save(data)
  }

}