
import { Request, Response } from "express";
import { DeleteCenterCostUseCase } from '../../modules/centercost/DeleteCenterCostUseCase';



export class DeleteCenterCostController {

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteCenterCost = new DeleteCenterCostUseCase()

    const result = await deleteCenterCost.execute({ id })

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    if(result == "OK"){
      return response.status(200).json("Centro de custo deletado com sucesso!")
    }
  }
}