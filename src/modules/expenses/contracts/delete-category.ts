import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteCategory {
  export type Params = {
    id: string
  }
  export type Result = Either<AppError, string>
}