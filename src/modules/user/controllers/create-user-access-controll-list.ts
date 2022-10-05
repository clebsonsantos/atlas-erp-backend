import { container } from 'tsyringe' 
import { Request, Response } from "express" 
import { CreateUserAccessControlListUseCase } from "../usecases/create-user-access-controll-list" 

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response) {
    const { permissions, roles } = request.body 
    const { userId } = request.params 

    const createUserACLService = container.resolve(CreateUserAccessControlListUseCase)

    const result = await createUserACLService.execute({
      userId,
      permissions,
      roles,
    }) 

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message) 
    }

    return response.json(result.value) 
  }
}
