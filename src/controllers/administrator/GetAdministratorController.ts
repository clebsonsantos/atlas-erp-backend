
import { Request, Response } from "express";
import { GetAdministratorUseCase } from '../../usecases/administrator/GetAdministratorUseCase';


export class GetAdministratorController {

  async handle(request: Request, response: Response) {

    const getAllAdmin = new GetAdministratorUseCase()

    const administrator = await getAllAdmin.execute()

    response.status(200).json(administrator[0])

  }
}
