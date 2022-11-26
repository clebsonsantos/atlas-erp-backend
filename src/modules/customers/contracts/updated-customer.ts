import { Either } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { Customer } from "../infra/typeorm/entities/customer" 

export namespace UpdateCustomer {
  export type Input = Omit<Customer, "created_at">
  export type Output = Either<AppError, Customer>
}