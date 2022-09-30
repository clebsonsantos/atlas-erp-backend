import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../modules/user/GetAllUsersUseCase";

export class GetAllUsersController {
  async handle(request: Request, response: Response) {
    const getAllUsersService = new GetAllUsersUseCase();

    const users = await getAllUsersService.execute();

    if(users instanceof Array){
        users.forEach(item=> {
          item.password = 'not displayed for security reasons'
        })
    }

    return response.json(users);
  }
}
