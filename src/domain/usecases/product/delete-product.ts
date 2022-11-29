import { ProductRepository } from "@/domain/contracts/repositories"
import { DeleteProduct } from "@/domain/contracts/usecases"
import { Failure, RelationshipError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class DeleteProductUseCase implements DeleteProduct {
  constructor(
    private readonly productRepository: ProductRepository
  ){}

  async execute({ id }: DeleteProduct.Input): Promise<DeleteProduct.Output> {
    const product = await this.productRepository.findById(id)
    if(!product){
      return left(new Failure("Product does not exists"))
    }
    const deleteProduct = await this.productRepository.delete(id)
    
    return !deleteProduct
      ? left(new RelationshipError())
      : right("Produto deletado com sucesso.")
  }
}
