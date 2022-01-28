
import { Request, Response } from "express";
import { CreateCenterCostUseCase } from '../../usecases/centercost/CreateCenterCostUseCase';


export class CreateCenterCostController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
  
    const createCenterCostController = new CreateCenterCostUseCase()
  
    const result = await createCenterCostController.execute({name})
    if(result instanceof Error){
    return response.status(400).json(result.message)
  
    }
  
    return response.status(200).json(result)
  }

}




