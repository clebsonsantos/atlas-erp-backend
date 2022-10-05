import { ICenterCostRepository } from "@/modules/expenses/repositories/icenter-cost-repository"
import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject } from "tsyringe"
import { CreateProduct } from "../contracts/create-product"
import { ProductRepository } from "../repositories/product-repository"

export class CreateProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @inject("CenterCostRepository")
    private readonly centerCostRepository: ICenterCostRepository
  ){}

  async execute({ name, description, price_default, center_cost_id }: CreateProduct.Params): Promise<CreateProduct.Result> {
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
