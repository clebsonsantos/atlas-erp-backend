import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteProduct {
  export type Params = {
    id: string
  }
  export type Result = Either<AppError, string>
}