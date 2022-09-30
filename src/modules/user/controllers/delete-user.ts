import { container } from 'tsyringe';

import { Request, Response } from "express";
import { DeleteUserUseCase } from "../usecases/delete-user";

export class DeleteUserController {

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteUser = container.resolve(DeleteUserUseCase)

    const result = await deleteUser.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
