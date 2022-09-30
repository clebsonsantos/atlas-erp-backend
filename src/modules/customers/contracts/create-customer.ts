import { Either } from "@/shared/either";
import { Customer } from "../infra/typeorm/entities/customer";

export namespace CreateCustomer {
  export type Params = Omit<Customer, "id" | "created_at">
  export type Result = Either<Error, Customer>
}