import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./repositories/iuser-reposiotry";

type DeleteType = {
  id: string
}

@injectable()
export class DeleteUserUseCase  {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({id}: DeleteType){
    const user = await this.userRepository.findById(id)
    if(!user){
      return new Error("Usuário não encontrado.");
    }

    const excludUser = await this.userRepository.removeById(id)
    if (!excludUser) {
      return new Error("Não é possível deletar esse registro.\nVerifique os relacionamentos que dependem dele.")
    }

    return "Usuário deletado com sucesso!"
    
  }
}

