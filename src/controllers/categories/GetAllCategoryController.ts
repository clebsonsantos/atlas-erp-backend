
import { Request, Response } from "express";
import { GetAllCategoryUseCase } from '../../modules/categories/GetAllCategoryUseCase';



export class GetAllCategoryController {

  async handle(request: Request, response: Response) {

    const getAllCategories = new GetAllCategoryUseCase()
    const categories = await getAllCategories.execute()
    return response.status(200).json(categories)
  }
}