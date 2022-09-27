import { UserRepository } from '../../repositories';

type DeleteType = {
  id: string
}

export class DeleteUserUseCase  {

  async execute({id}: DeleteType){
    const user = await UserRepository().findOne({id})
    let QueryFailedError;
    if(!user){
      return new Error("Usuário não encontrado.");
    }

    await UserRepository().delete({id}).catch((err)=> {
      QueryFailedError = err.message
    })

    if(QueryFailedError && QueryFailedError.includes("violates foreign key constraint")){
      return new Error("Não é possível deletar esse registro.\nExistem relacionamentos que dependem dele.")
    }
    return "Usuário deletado com sucesso!"
    
  }
}

