import { ProductDTO } from "@/domain/entities"
import { CreateProduct } from "@/domain/contracts/usecases"

export interface ProductRepository {
  add(data: CreateProduct.Input): Promise<ProductDTO>
  findById(id: string): Promise<ProductDTO>
  delete(id: string): Promise<boolean>
  findByName(name: string): Promise<ProductDTO>
  list(order: "ASC" | "DESC"): Promise<ProductDTO[]>
  update(data: ProductDTO): Promise<ProductDTO>
}