import { left, right } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { inject, injectable } from "tsyringe" 
import { DeleteUserById } from "../contracts/delete-user-by-id" 
import { IUserRepository } from "../repositories/iuser-repository" 

@injectable()
export class DeleteUserUseCase  {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ id }: DeleteUserById.Input): Promise<DeleteUserById.Output>{
    const user = await this.userRepository.findById(id)
    if(!user){
      return left(new AppError("Usuário não encontrado.", 404)) 
    }

    const excludUser = await this.userRepository.removeById(id)
    if (!excludUser) {
      return left(new AppError("Não é possível deletar esse registro.\nVerifique os relacionamentos que dependem dele.", 406))
    }

    return right("Usuário deletado com sucesso!")
    
  }
}

