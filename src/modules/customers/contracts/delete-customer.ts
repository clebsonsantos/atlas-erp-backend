import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteCustomer {
  export type Params = {
    id: string
  }
  export type Result = Either<AppError, String>
}