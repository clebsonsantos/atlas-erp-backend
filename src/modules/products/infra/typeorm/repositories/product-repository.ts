import { CreateProduct } from "@/modules/products/contracts/create-product";
import { ProductRepository } from "@/modules/products/repositories/product-repository";
import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/product";

export class ProductRepositoryImpl implements ProductRepository {
  
  private readonly repository: Repository<Product>
  constructor(){
    this.repository = getRepository(Product)
  }

  async add(data: CreateProduct.Params): Promise<Product> {
    const toSave = this.repository.create(data)
    const product = await this.repository.save(toSave)
    return product
  }
  async findById(id: string): Promise<Product> {
    return await this.repository.findOne({ id }, {relations: ["center_cost"]})
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete({ id })
      return true
    } catch {
      return false
    }
  }
  async findByName(name: string): Promise<Product> {
    return await this.repository.findOne({ name })
  }
  async list(): Promise<Product[]> {
    return await this.repository.find({relations: ["center_cost"], order: {
        name: "ASC"
    }})
  }
}