import { container } from 'tsyringe' 
import { Request, Response } from "express" 
import { FindAllUsersUseCase } from "../usecases/find-all-users" 

export class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const getAllUsersService = container.resolve(FindAllUsersUseCase)

    const users = await getAllUsersService.execute() 
    return response.json(users) 
  }
}
