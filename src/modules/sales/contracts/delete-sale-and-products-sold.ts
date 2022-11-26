import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteSaleAndProductsSold {
  export type Input = {
    id: string
  }

  export type Output = Either<AppError, String>
}