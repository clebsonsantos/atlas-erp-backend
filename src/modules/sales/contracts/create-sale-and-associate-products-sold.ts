import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { ProductSales } from "../infra/typeorm/entities/product-sale"
import { Sales } from "../infra/typeorm/entities/sale"

export namespace CreateSaleAndAssociateProductsSold {

  export type ProductsSoldParams = Omit<ProductSales, "created_at" | "id">

  export type Params = {
    date: Date
    customer_id: string
    salesman: string
    userId?: string
    products_sold: ProductsSoldParams[]
  }

  export type Result = Either<AppError, Sales>
}
