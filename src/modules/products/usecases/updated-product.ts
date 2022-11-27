import { CenterCostRepository } from "@/domain/contracts/repositories"

import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { UpdatedProduct } from "../contracts/updated-product"
import { ProductRepository } from "../repositories/product-repository"


@injectable()
export class UpdateProductUseCase  {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @inject("CenterCostRepository")
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
      return left(new AppError("Centro de custo não encontrado.", 404))
    }

    const product = await this.productRepository.findById(id)
    if(!product){
      return left(new AppError("Produto não encontrado.", 404))
    }

    product.name = name ? name : product.name 
    product.description = description ? description : product.description 
    product.price_default = price_default ? price_default : product.price_default 
    product.center_cost_id = center_cost_id ? center_cost_id : product.center_cost_id 

    const productSave = await this.productRepository.update(product)

    return right(productSave)
  }
}
