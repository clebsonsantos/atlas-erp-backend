import { UuidValidate } from './../../shared/infra/uuid/uuid-validate' 
import { Request, Response } from "express" 
import { CreateProductsUseCase } from "../../modules/products/CreateProductsUseCase" 

const isValidUUID = new UuidValidate()
export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price_default, center_cost_id } = request.body 
    const createProductService = new CreateProductsUseCase() 
    if (!isValidUUID.validateUuid(center_cost_id)) {
      return response.status(400).json("Invalid uuid")
    }
    const product = await createProductService.execute({
      name,
      description,
      price_default,
      center_cost_id
    }) 

    if(product instanceof Error){
      return response.status(400).json(product.message)
    }

    return response.json(product) 
  }
}
