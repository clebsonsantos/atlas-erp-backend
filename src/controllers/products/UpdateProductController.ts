
import { UuidValidate } from "@/shared/infra/uuid";
import { Request, Response } from "express";
import { UpdateProductUseCase } from '../../usecases/products/UpdateProductUseCase';

const isValidUUID = new UuidValidate()
export class UpdateProductController {

  async handle(request: Request, response: Response) {
    const { name, description, price_default, center_cost_id  } = request.body
    const { id } = request.params
    
    if (!isValidUUID.validateUuid(center_cost_id)) {
      return response.status(400).json("Invalid uuid")
    }

    const product = new UpdateProductUseCase()

    const result = await product.execute({id, name, description, price_default, center_cost_id })

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }
}