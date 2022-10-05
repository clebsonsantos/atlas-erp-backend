import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Category } from "../infra/typeorm/entities/category"

export namespace UpdatedCategory {
  export type Params = {
    id: string
    name: string
  }
  export type Result = Either<AppError, Category>
}