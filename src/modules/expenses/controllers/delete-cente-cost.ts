import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteCenterCostUseCase } from "../usecases/delete-center-cost"

export class DeleteCenterCostController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteCenterCost = container.resolve(DeleteCenterCostUseCase)

    const result = await deleteCenterCost.execute({ id })

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }
    return response.status(200).json(result.value)
  }
}