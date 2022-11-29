import { CreateProduct } from "@/domain/contracts/usecases";
import { ProductRepository } from "@/domain/contracts/repositories";
import { getRepository } from "typeorm"; 
import { ProductDTO, Product} from "@/domain/entities";

export class ProductRepositoryImpl implements ProductRepository {

  async add(data: CreateProduct.Input): Promise<ProductDTO> {
    const repository = getRepository(Product)
    const toSave = repository.create(data)
    const product = await repository.save(toSave)
    return product
  }
  
  async findById(id: string): Promise<ProductDTO> {
    const repository = getRepository(Product)
    return await repository.findOne({ id }, {relations: ["center_cost"]})
  }

  async delete(id: string): Promise<boolean> {
    const repository = getRepository(Product)
    try {
      await repository.delete({ id })
      return true
    } catch {
      return false
    }
  }

  async findByName(name: string): Promise<ProductDTO> {
    const repository = getRepository(Product)
    return await repository.findOne({ name })
  }

  async list(order: "ASC" | "DESC"): Promise<ProductDTO[]> {
    const repository = getRepository(Product)
    return await repository.find({relations: ["center_cost"], order: {
        name: order
    }})
  }

  async update(data: ProductDTO): Promise<ProductDTO> {
    const repository = getRepository(Product)
    return await repository.save(data) 
  }
}