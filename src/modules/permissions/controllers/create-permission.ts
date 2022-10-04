import { container } from "tsyringe"
import { Request, Response } from "express"
import { CreatePermissionUseCase } from "../usecases/create-permission"
import { Either, left, right } from "@/shared/either"

export class CreatePermissionController {

  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const validate = this.validate(name, description)

    if(validate.isLeft()) {
      return response.status(400).json(validate.value)
    }

    const createPermissionService = container.resolve(CreatePermissionUseCase)

    const result = await createPermissionService.execute({ name, description })

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message)
    }
    return response.json(result.value).status(200)
  }

  validate(name: string, description: string): Either<string, null> {
    const messageError = `Params is required: `
    if(!name) {
      return left(messageError + "name")
    }
    if(!description) {
      return left(messageError + "description")
    }
    return right(null)
  }
}
