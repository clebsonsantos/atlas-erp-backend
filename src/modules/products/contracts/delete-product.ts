import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteProduct {
  export type Input = {
    id: string
  }
  export type Output = Either<AppError, string>
}