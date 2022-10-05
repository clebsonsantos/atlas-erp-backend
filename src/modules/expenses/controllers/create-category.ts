
import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateCategoryUseCase } from "../usecases/create-category"

export class CreateCategoryController {

  async handle(request: Request, response: Response) {
    const { name } = request.body

    const createCategoryController = container.resolve(CreateCategoryUseCase)

    const result = await createCategoryController.execute({ name })
    if(result.isLeft()){
    return response.status(result.value.statusCode).json(result.value.message)

    }
    return response.status(200).json(result.value)
  }
}