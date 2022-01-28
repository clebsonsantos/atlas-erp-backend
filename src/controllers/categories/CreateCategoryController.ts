
import { Request, Response } from "express";
import { CreateCategoryUseCase } from '../../usecases/categories/CreateCategoryUseCase';



export class CreateCategoryController {

  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createCategoryController = new CreateCategoryUseCase()

    const result = await createCategoryController.execute({name})
    if(result instanceof Error){
    return response.status(400).json(result.message)

    }

    return response.status(200).json(result)
  }
}