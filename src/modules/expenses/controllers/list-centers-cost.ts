import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListCentersCostUseCase } from "../usecases/list-centers-cost"

export class GetAllCenterCostController {

  async handle(request: Request, response: Response) {
    const listCentersCostService = container.resolve(ListCentersCostUseCase)

    const centerCosts = await listCentersCostService.execute()
    return response.json(centerCosts)
  }
}