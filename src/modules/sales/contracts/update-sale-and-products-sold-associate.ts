import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Sales } from "../infra/typeorm/entities/sale"

export namespace UpdateSaleAndProductsSoldAssociate {
  export type ProductsSoldsParams = {
    id?: string 
    delete?: boolean 
    id_product: string
    quantity: number
    price_unit: number
    total_price: number 
    created_at: Date
  }
  export type SalesParams = {
    id: string
    date: Date,
    customer_id: string,
    salesman: string,
    products_sold: ProductsSoldsParams[]
  }

  export type Result = Either<AppError, Sales>
}