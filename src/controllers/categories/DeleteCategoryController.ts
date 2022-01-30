
import { Request, Response } from "express";
import { DeleteCategoryUseCase } from '../../usecases/categories/DeleteCategoryUseCase';



export class DeleteCategoryController {

  async handle(request: Request, response: Response) {

    const { id } = request.params

    const deleteCategory = new DeleteCategoryUseCase()

    const result = await deleteCategory.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }
    if(result == "OK")
    return response.status(200).json("Categoria deletada com sucesso!")

  }
}