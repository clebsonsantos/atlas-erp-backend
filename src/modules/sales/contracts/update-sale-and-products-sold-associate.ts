import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Sales } from "../infra/typeorm/entities/sale"

export namespace UpdateSaleAndProductsSoldAssociate {
  export type ProductsSoldsInput = {
    id?: string 
    delete?: boolean 
    id_product: string
    quantity: number
    price_unit: number
    total_price: number 
    created_at: Date
  }
  export type SalesInput = {
    id: string
    date: Date,
    customer_id: string,
    salesman: string,
    products_sold: ProductsSoldsInput[]
  }

  export type Output = Either<AppError, Sales>
}