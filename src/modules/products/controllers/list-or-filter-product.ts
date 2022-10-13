import { Request, Response } from "express" 
import { container } from "tsyringe"
import { ListOrFilterProductByIdName } from "../usecases/list-or-filter-product-by-id-name"

export class GetAllProductsController {
  async handle(request: Request, response: Response) {
    const { id, name } = request.body 
    const getAllProductsService = container.resolve(ListOrFilterProductByIdName)

    const products = await getAllProductsService.execute({ id, name }) 

    return response.json(products) 
  }
}
