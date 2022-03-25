import { ProductRepository } from '../../repositories';

type Type = {
  id: string
}


export class DeleteProductUseCase  {

  async execute({ id }: Type) {
    const product = await ProductRepository().findOne({id})
    let ErrorQuery;

    if(!product){
      return new Error("Produto não encontrado.");
    }

    await ProductRepository().delete({ id }).catch(error => {
      ErrorQuery = error.message
    })

    if(ErrorQuery && ErrorQuery.includes("violates foreign key constraint")){
      return new Error("Não é possível deletar esse registro. Existem relacionamentos que dependem dele.")
    }
    return "OK"
    
  }
}
