import { UuidValidate } from "@/shared/infra/uuid"
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { CreateProductsUseCase } from "../usecases/create-product"

const isValidUUID = new UuidValidate()
export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price_default, center_cost_id } = request.body 
    const createProductService = container.resolve(CreateProductsUseCase)

    if (!isValidUUID.validateUuid(center_cost_id)) {
      return response.status(400).json("Invalid uuid")
    }
    const product = await createProductService.execute({
      name,
      description,
      price_default,
      center_cost_id
    }) 

    if(product.isLeft()){
      return response.status(product.value.statusCode).json(product.value.message)
    }

    return response.json(product.value) 
  }
}
