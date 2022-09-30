import { Either } from "@/shared/either";
import { Customer } from "../infra/typeorm/entities/customer";

export namespace UpdateCustomer {
  export type Params = Omit<Customer, "created_at">
  export type Result = Either<Error, Customer>
}