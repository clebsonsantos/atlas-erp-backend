import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteExpense {
  export type Params = {
    id: string
  }
  export type Result = Either<AppError, string>
}