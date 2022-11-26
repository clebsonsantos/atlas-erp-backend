import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { ProductSales } from "../infra/typeorm/entities/product-sale"
import { Sales } from "../infra/typeorm/entities/sale"

export namespace CreateSaleAndAssociateProductsSold {

  export type ProductsSoldInput = Omit<ProductSales, "created_at" | "id" | "product">

  export type Input = {
    date: Date
    customer_id: string
    salesman: string
    userId?: string
    sale_number?: number
    products_sold: ProductsSoldInput[]
  }

  export type Output = Either<AppError, Sales>
}
