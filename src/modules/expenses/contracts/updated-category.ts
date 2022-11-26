import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Category } from "../infra/typeorm/entities/category"

export namespace UpdatedCategory {
  export type Input = {
    id: string
    name: string
  }
  export type Output = Either<AppError, Category>
}