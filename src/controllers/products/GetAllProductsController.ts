import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../../usecases/products/GetAllProductsUseCase";

export class GetAllProductsController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    const getAllProductsService = new GetAllProductsUseCase();

    const products = await getAllProductsService.execute({id});

    return response.json(products);
  }
}
