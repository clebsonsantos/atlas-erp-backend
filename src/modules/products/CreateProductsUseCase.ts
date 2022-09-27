import { Product } from '../../entities/Product';
import { CenterCostRepository, ProductRepository } from "../../repositories";

type ProductRequest = {
  name: string;
  description: string;
  price_default: number;
  center_cost_id: string
};

export class CreateProductsUseCase {
  async execute({ name, description, price_default, center_cost_id }: ProductRequest): Promise<Product | Error> {

    price_default = price_default ? price_default : 0
    const product = ProductRepository().create({
      name,
      description,
      price_default,
      center_cost_id
    });

    if(!await CenterCostRepository().findOne({id: center_cost_id})){
      return new Error ("Centro de custo não existe!")

    }
    await ProductRepository().save(product);

    return product;
  }
}
