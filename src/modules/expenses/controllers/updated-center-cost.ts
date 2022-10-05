import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateCenterCostUseCase } from "../usecases/updated-center-cost"

export class UpdateCenterCostController {

  async handle(request: Request, response: Response) {
    const { name } = request.body
    const { id } = request.params

    const updateCenterCost = container.resolve(UpdateCenterCostUseCase)

    const result = await updateCenterCost.execute({ id, name })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.status(200).json(result.value)
  }
}