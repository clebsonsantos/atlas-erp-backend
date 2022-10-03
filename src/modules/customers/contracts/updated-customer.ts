import { Either } from "@/shared/either";
import { AppError } from "@/shared/errors/AppError";
import { Customer } from "../infra/typeorm/entities/customer";

export namespace UpdateCustomer {
  export type Params = Omit<Customer, "created_at">
  export type Result = Either<AppError, Customer>
}