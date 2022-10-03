import { ProductRepository } from "../../repositories";
import { Product } from "./infra/typeorm/entities/product";

type IProductSearch = {
  id?: string,
  name?:string
}

export class GetAllProductsUseCase {
  async execute({id, name }: IProductSearch): Promise<Product[] | Product> {
    const findByParams = id ? await ProductRepository().findOne({ id }, {relations: ["center_cost"]}) : await ProductRepository().findOne({ name }, {relations: ["center_cost"]}) 
    const paramsFind = id ? id : name

    const products = 
      paramsFind ? findByParams : 
        await ProductRepository().find({relations: ["center_cost"], order: {
          name: "ASC"
        }})
    return products;
  }
}
