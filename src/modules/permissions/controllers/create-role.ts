import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateRoleUseCase } from "../usecases/create-role"

export class CreateRoleController {
  
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createRoleService = container.resolve(CreateRoleUseCase)

    const result = await createRoleService.execute({ name, description })

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.json(result.value)
  }
}
