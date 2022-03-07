import { UserRepository } from '../../repositories';

type DeleteType = {
  id: string
}

export class DeleteUserUseCase  {

  async execute({id}: DeleteType){
    const user = await UserRepository().findOne({id})

    if(!user){
      return new Error("Usuário não encontrado.");
    }

    UserRepository().delete({id})
    
  }
}

