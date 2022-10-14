import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository"
import { ProductRepository } from "@/modules/products/repositories/product-repository"
import { CreateSaleAndAssociateProductsSold } from "../contracts/create-sale-and-associate-products-sold"
import { ProductsSoldRepository } from "../repositories/product-sold-repository"
import { SaleRepository } from "../repositories/sales-repository"


@injectable()
export class CreateSaleAndProductsAssociateUseCase  {
  constructor(
    @inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @inject("SaleRepository")
    private readonly saleRepository: SaleRepository,
    @inject("ProductsSoldRepository")
    private readonly productSoldRepository: ProductsSoldRepository,    
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ){}

  async execute({
    date, 
    customer_id, 
    salesman,
    userId,
    products_sold
  }: CreateSaleAndAssociateProductsSold.Params): Promise<CreateSaleAndAssociateProductsSold.Result> {
    const customer = await this.customerRepository.findById(customer_id)
    if(!customer){
      return left(new AppError("Este cliente não existe."))
    }

    if (!products_sold.length) {
      return left(new AppError("Você precisa inserir ao menos um produto para prosseguir."))
    }

    const validateProducts = this.validateProductsParams(products_sold)
    if (validateProducts.isLeft()) {
      return left(new AppError(validateProducts.value))
    }
    
    for await (const product of products_sold){
      const productValidate = await this.productRepository.findById(product.id_product)
      if (!productValidate) {
        return left(new AppError(`Este produto não existe: ${product.id_product}`))
      }
    }

    const sales = await this.saleRepository.list()
    const salesNumber = sales.length + 1
    const salesman_id = salesman ? salesman : userId
    
    const productsIds = new Array()
    for await (const product of products_sold){
      const resultProduct = await this.productSoldRepository.add(product)
      productsIds.push(resultProduct.id)
    }
    
    const productsExists = await this.productSoldRepository.findByIds(productsIds)
    
    const sale = await this.saleRepository.add({
      date,
      customer_id,
      salesman: salesman_id,
      sale_number: salesNumber,
      products_sold: productsExists
    })
    
    return right(sale)

  }

  validateProductsParams(products: CreateSaleAndAssociateProductsSold.ProductsSoldParams[]): Either<string, null> {
    const messageError = `Params is required: `
    for (const product of products) {
        if (!product.id_product) {
          return left(messageError.concat("id_product"))
        }
        if (!product.price_unit) {
          return left(messageError.concat("price_unit"))
        }
        if (!product.quantity) {
          return left(messageError.concat("quantity"))
        }
        if (!product.total_price) {
          return left(messageError.concat("total_price"))
        }
        return right(null)
    }
  }
}
