import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateCategoryUseCase } from "../usecases/updated-category"

export class UpdateCategoryController {

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { name} = request.body

    const updateCategory = container.resolve(UpdateCategoryUseCase)

    const result = await updateCategory.execute({ id, name })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }
    return response.status(200).json(result.value)
  }
}