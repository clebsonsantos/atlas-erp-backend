import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetAllPermissionsUseCase } from "../usecases/get-all-permissions"

export class GetAllPermissionsController {

  async handle(request: Request, response: Response) {
    const getAllPermissions = container.resolve(GetAllPermissionsUseCase)

    const permissions = await getAllPermissions.execute()

    return response.json(permissions)
  }
}