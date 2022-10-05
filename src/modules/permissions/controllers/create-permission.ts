import { container } from "tsyringe"
import { Request, Response } from "express"
import { CreatePermissionUseCase } from "../usecases/create-permission"

export class CreatePermissionController {

  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createPermissionService = container.resolve(CreatePermissionUseCase)

    const result = await createPermissionService.execute({ name, description })

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message)
    }
    return response.json(result.value).status(200)
  }

}
