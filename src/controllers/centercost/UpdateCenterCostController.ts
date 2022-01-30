
import { Request, Response } from "express";
import { UpdateCenterCostUseCase } from '../../usecases/centercost/UpdateCenterCostUseCase';



export class UpdateCenterCostController {

  async handle(request: Request, response: Response) {
    const { name } = request.body
    const { id } = request.params

    const updateCenterCost = new UpdateCenterCostUseCase()

    const result = await updateCenterCost.execute({ id, name })

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)

  }
}