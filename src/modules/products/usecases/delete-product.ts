import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { DeleteProduct } from "../contracts/delete-product"
import { ProductRepository } from "../repositories/product-repository"


@injectable()
export class DeleteProductUseCase  {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ){}

  async execute({ id }: DeleteProduct.Params): Promise<DeleteProduct.Result> {
    const product = await this.productRepository.findById(id)

    if(!product){
      return left(new AppError("Produto não encontrado.", 404))
    }
    const deleteProduct = await this.productRepository.delete(id)

    if(!deleteProduct){
      return left(new AppError("Não é possível deletar esse registro.\nVerifique os relacionamentos que dependem dele."))
    }
    return right("Produto deletado com sucesso.")
  }
}
