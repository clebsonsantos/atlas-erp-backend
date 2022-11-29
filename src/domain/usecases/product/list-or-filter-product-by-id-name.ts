import { ProductRepository } from "@/domain/contracts/repositories"
import { ListProducts } from "@/domain/contracts/usecases"

export class ListOrFilterProductByIdName implements ListProducts {
  constructor(
    private readonly productRepository: ProductRepository
  ){}

  async execute({ id, name }: ListProducts.Input): Promise<ListProducts.Output> {
    const findByInput = id 
      ? await this.productRepository.findById(id) 
      : await this.productRepository.findByName(name)

    const InputFind = id ? id : name
    const products = InputFind 
      ? findByInput 
      : await this.productRepository.list("ASC")

    return products 
  }
}
