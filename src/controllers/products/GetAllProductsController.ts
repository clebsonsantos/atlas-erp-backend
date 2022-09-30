import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../../modules/products/GetAllProductsUseCase";

export class GetAllProductsController {
  async handle(request: Request, response: Response) {
    const { id, name } = request.body;
    const getAllProductsService = new GetAllProductsUseCase();

    const products = await getAllProductsService.execute({id, name});

    return response.json(products);
  }
}
