import { CustomerRepository } from "@/repositories";
import { Either, left, right } from "@/shared/either";

type Type = {
  id: string
}
namespace DeleteCustomerUseCase {
  export type Params = {
    id: string
  }
  export type Result = Either<Error, String>
}
export class DeleteCustomerUseCase  {

  async execute({ id }: Type){
    const customer = await CustomerRepository().findOne({id})

    if(!customer){
      return left(new Error("Cliente não encontrado."));
    }
    let ErrorQuery: string
    await CustomerRepository().delete({id}).catch(error => {
      ErrorQuery = error.message
    })

    if(ErrorQuery && ErrorQuery.includes("violates foreign key constraint")){
      return left(new Error("Não é possível deletar esse registro. Existem relacionamentos que dependem dele."))
    }
    return right("Cliente deletado com sucesso")
    
  }
}
