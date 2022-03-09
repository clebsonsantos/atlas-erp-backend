import { ProductRepository } from '../../repositories';

type Type = {
  id: string
}


export class DeleteProductUseCase  {

  async execute({ id }: Type) {
    const product = await ProductRepository().findOne({id})

    if(!product){
      return new Error("Produto não encontrado.");
    }

    ProductRepository().delete({id})
    
  }
}
