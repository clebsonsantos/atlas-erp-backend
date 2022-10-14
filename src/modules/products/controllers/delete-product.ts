
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { DeleteProductUseCase } from "../usecases/delete-product"

export class DeleteProductController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteProduct = container.resolve(DeleteProductUseCase)

    const result = await deleteProduct.execute({id})

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.json(result.value)
  }
}