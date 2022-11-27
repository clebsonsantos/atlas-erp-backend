import { CenterCostRepository } from "@/domain/contracts/repositories"
import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { CreateProduct } from "../contracts/create-product"
import { ProductRepository } from "../repositories/product-repository"

@injectable()
export class CreateProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @inject("CenterCostRepository")
    private readonly centerCostRepository: CenterCostRepository
  ){}

  async execute({ name, description, price_default, center_cost_id }: CreateProduct.Input): Promise<CreateProduct.Output> {
    const validate = this.validate(name, description)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }
    const centerCost = await this.centerCostRepository.findById(center_cost_id)
    if(!centerCost){
      return left(new AppError("Centro de custo não existe!"))
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

  validate(name: string, description: string): Either<string, null> {
    const messageError = `Param is required: `
    if (!name) {
      return left(messageError.concat("name"))
    }
    if (!description) {
      return left(messageError.concat("description"))
    }
    return right(null)
  }
}
