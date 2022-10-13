
import { UuidValidate } from "@/shared/infra/uuid" 
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { UpdateProductUseCase } from "../usecases/updated-product"

const isValidUUID = new UuidValidate()
export class UpdateProductController {

  async handle(request: Request, response: Response) {
    const { name, description, price_default, center_cost_id  } = request.body
    const { id } = request.params
    
    if (!isValidUUID.validateUuid(center_cost_id)) {
      return response.status(400).json("Invalid uuid")
    }

    const product = container.resolve(UpdateProductUseCase)

    const result = await product.execute({ id, name, description, price_default, center_cost_id })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.status(200).json(result.value)
  }
}