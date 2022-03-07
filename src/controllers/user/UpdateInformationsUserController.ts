
import { Request, Response } from "express";
import {UpdateInformationsUserUseCase} from '../../usecases/user/UpdateInformationsUserUseCase'


export class UpdateInformationsUserController {

  async handle(request: Request, response: Response) {
    const {username, full_name, phone, password, email} = request.body;
    const { id } = request.params;

    const user = new UpdateInformationsUserUseCase()
    const result = await user.execute({id, username, password, email, full_name, phone})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }
}