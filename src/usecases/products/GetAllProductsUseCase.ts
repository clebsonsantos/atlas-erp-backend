import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories";

export class GetAllProductsUseCase {
  async execute(): Promise<Product[]> {
    const products = await ProductRepository().find();
    return products;
  }
}
