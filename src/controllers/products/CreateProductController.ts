import { Request, Response } from "express";
import { CreateProductsUseCase } from "../../usecases/products/CreateProductsUseCase";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price_default, center_cost_id } = request.body;

    const createProductService = new CreateProductsUseCase();

    const product = await createProductService.execute({
      name,
      description,
      price_default,
      center_cost_id
    });

    if(product instanceof Error){
      return response.status(400).json(product.message)
    }

    return response.json(product);
  }
}
