import { container } from 'tsyringe' 

import { Request, Response } from "express" 
import { UpdatedUserInfoUserUseCase } from "../usecases/updated-user-info" 


export class UpdatedUserInfoController {

  async handle(request: Request, response: Response) {
    const {username, full_name, phone, password, email} = request.body 
    const { id } = request.params 

    const user = container.resolve(UpdatedUserInfoUserUseCase)
    const result = await user.execute({id, username, password, email, full_name, phone})

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.status(200).json(result.value)
  }
}