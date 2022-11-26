import { inject, injectable } from "tsyringe"
import { Product } from "../infra/typeorm/entities/product"
import { ProductRepository } from "../repositories/product-repository"

type Request = {
  id?: string,
  name?:string
}

@injectable()
export class ListOrFilterProductByIdName {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ){}

  async execute({ id, name }: Request): Promise<Product[] | Product> {
    const findByInput = id ? await this.productRepository.findById(id) : await this.productRepository.findByName(name)
    const InputFind = id ? id : name

    const products = 
      InputFind ? findByInput : 
        await this.productRepository.list("ASC")
    return products 
  }
}
