
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { ListAdministratorCompanyUseCase } from "../usecases/list-administrator-company"

export class ListAdministratorCompanyController {

  async handle(request: Request, response: Response) {
    const getAllAdmin = container.resolve(ListAdministratorCompanyUseCase)
    const administrator = await getAllAdmin.execute()
    response.status(200).json(administrator)
  }
}
