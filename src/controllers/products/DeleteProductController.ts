
import { Request, Response } from "express" 
import { DeleteProductUseCase } from '../../modules/products/DeleteProductUseCase' 

export class DeleteProductController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteProduct = new DeleteProductUseCase()

    const result = await deleteProduct.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json("Produto deletado com sucesso!")
  }
}