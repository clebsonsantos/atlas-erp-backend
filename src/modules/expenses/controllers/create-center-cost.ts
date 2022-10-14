import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateCenterCostUseCase } from "../usecases/create-center-cost"


export class CreateCenterCostController {

  async handle(request: Request, response: Response) {
    const { name } = request.body
  
    const createCenterCostController = container.resolve(CreateCenterCostUseCase)
  
    const result = await createCenterCostController.execute({name})
    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.status(200).json(result.value)
  }
}




