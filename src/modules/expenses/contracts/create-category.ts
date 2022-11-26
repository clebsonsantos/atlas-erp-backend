import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Category } from "../infra/typeorm/entities/category"

export namespace CreateCategory {
  export type Input = {
    name: string
  }
  export type Output = Either<AppError, Category>
}