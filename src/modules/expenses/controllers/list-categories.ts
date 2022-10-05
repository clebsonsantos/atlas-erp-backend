import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListCategoriesUseCase } from "../usecases/list-categories"

export class GetAllCategoryController {

  async handle(request: Request, response: Response) {
    const listCategoriesService = container.resolve(ListCategoriesUseCase)
    const categories = await listCategoriesService.execute()

    return response.status(200).json(categories)
  }
}