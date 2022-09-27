import { CustomerRepository } from "@/repositories";

type Type = {
  id: string
}


export class DeleteCustomerUseCase  {

  async execute({id}: Type){
    const customer = await CustomerRepository().findOne({id})

    if(!customer){
      return new Error("Cliente não encontrado.");
    }
    let ErrorQuery;
    await CustomerRepository().delete({id}).catch(error => {
      ErrorQuery = error.message
    })

    if(ErrorQuery && ErrorQuery.includes("violates foreign key constraint")){
      return new Error("Não é possível deletar esse registro. Existem relacionamentos que dependem dele.")
    }
    return "OK"
    
  }
}
