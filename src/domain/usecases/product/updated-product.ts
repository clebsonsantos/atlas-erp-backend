import { CenterCostRepository, ProductRepository } from "@/domain/contracts/repositories"
import { UpdatedProduct } from "@/domain/contracts/usecases"
import { Failure } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class UpdateProductUseCase implements UpdatedProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute({
    id,
    name,
    description,
    price_default,
    center_cost_id
  }: UpdatedProduct.Input): Promise<UpdatedProduct.Output> {
    const centerCost = await this.centerCostRepository.findById(center_cost_id)
    if(!centerCost){
      return left(new Failure("Center cost does not exists"))
    }
    const product = await this.productRepository.findById(id)
    if(!product){
      return left(new Failure("Product does not exists"))
    }
    product.name = name ? name : product.name 
    product.description = description ? description : product.description 
    product.price_default = price_default ? price_default : product.price_default 
    product.center_cost_id = center_cost_id ? center_cost_id : product.center_cost_id 
    const productSave = await this.productRepository.update(product)

    return right(productSave)
  }
}
