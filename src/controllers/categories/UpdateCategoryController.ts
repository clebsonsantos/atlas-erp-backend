
import { Request, Response } from "express";
import { UpdateCategoryUseCase } from '../../usecases/categories/UpdateCategoryUseCase';



export class UpdateCategoryController {

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { name} = request.body

    const updateCategory = new UpdateCategoryUseCase()

    const result = await updateCategory.execute({id, name})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }
}