import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateRolePermissionUseCase } from "../usecases/create-role-permission"

export class CreateRolePermissionController {

  async handle(request: Request, response: Response) {
    const { roleId } = request.params
    const { permissions } = request.body

    const createRolePermissionService = container.resolve(CreateRolePermissionUseCase)

    const result = await createRolePermissionService.execute({
      roleId,
      permissions,
    })

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.json(result.value)
  }
}
