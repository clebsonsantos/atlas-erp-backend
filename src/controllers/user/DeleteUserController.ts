
import { Request, Response } from "express";
import { DeleteUserUseCase } from '../../usecases/user/DeleteUserUseCase'



export class DeleteUserController {

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteUser = new DeleteUserUseCase()

    const result = await deleteUser.execute({id})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.json("Usuário deletado com sucesso!")
  }
}
