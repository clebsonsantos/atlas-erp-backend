import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "../usecases/delete-category";

export class DeleteCategoryController {

  async handle(request: Request, response: Response) {

    const { id } = request.params

    const deleteCategory = container.resolve(DeleteCategoryUseCase)

    const result = await deleteCategory.execute({id})

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }
    return response.status(200).json(result.value)
  }
}