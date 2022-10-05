import { CreateProduct } from "../contracts/create-product";
import { Product } from "../infra/typeorm/entities/product";

export interface ProductRepository {
  add(data: CreateProduct.Params): Promise<Product>
  findById(id: string): Promise<Product>
  delete(id: string): Promise<boolean>
}