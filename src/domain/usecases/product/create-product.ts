import { CenterCostRepository, ProductRepository } from "@/domain/contracts/repositories"
import { CreateProduct } from "@/domain/contracts/usecases"
import { Failure, InvalidFieldError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class CreateProductsUseCase implements CreateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute({ name, description, price_default, center_cost_id }: CreateProduct.Input): Promise<CreateProduct.Output> {
    if (!name || !description) {
      return !name 
        ? left(new InvalidFieldError("name"))
        : left(new InvalidFieldError("description"))
    }
    const centerCost = await this.centerCostRepository.findById(center_cost_id)
    if(!centerCost){
      return left(new Failure("Center cost does not exists"))
    }
    price_default = price_default ? price_default : 0

    const product = await this.productRepository.add({
      name, 
      description, 
      price_default,
      center_cost_id
    })
    return right(product) 
  }
}
