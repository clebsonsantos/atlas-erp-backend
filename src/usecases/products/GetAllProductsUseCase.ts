import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories";

type IProductSearch = {
  id?: string
}

export class GetAllProductsUseCase {
  async execute({id}: IProductSearch): Promise<Product[] | Product> {

    const products = 
        id ? await ProductRepository().findOne({ id }, {relations: ["center_cost"]}) : 
        await ProductRepository().find({relations: ["center_cost"]})
    return products;
  }
}
