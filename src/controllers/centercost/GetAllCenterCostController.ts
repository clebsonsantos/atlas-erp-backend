
import { Request, Response } from "express";
import { GetAllCenterCostUseCase } from '../../modules/centercost/GetAllCenterCostUseCase';



export class GetAllCenterCostController {

  async handle(request: Request, response: Response) {
    const repo = new GetAllCenterCostUseCase()

    const center_cost = await repo.execute()

    return response.json(center_cost)
  }
}