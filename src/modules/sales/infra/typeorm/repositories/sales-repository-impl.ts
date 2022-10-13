import { CreateSaleAndAssociateProductsSold } from "@/modules/sales/contracts/create-sale-and-associate-products-sold";
import { SaleRepository } from "@/modules/sales/repositories/sales-repository";
import { Sales } from "../entities/sale";


export class SaleRepositoryImpl implements SaleRepository {
  async add(data: CreateSaleAndAssociateProductsSold.Params): Promise<Sales> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Sales> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findByName(name: string): Promise<Sales> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<Sales[]> {
    throw new Error("Method not implemented.");
  }
  async update(data: Sales): Promise<Sales> {
    throw new Error("Method not implemented.");
  }

}