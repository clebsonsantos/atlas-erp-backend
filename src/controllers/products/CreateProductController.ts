import { Request, Response } from "express";
import { CreateProductsUseCase } from "../../usecases/products/CreateProductsUseCase";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price } = request.body;

    const createProductService = new CreateProductsUseCase();

    const product = await createProductService.execute({
      name,
      description,
      price,
    });

    return response.json(product);
  }
}
