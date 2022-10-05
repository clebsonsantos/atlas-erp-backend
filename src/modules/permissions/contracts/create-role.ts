import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Role } from "../infra/typeorm/entities/role"

export namespace CreateRole {
  export type Params = {
    name: string
    description: string
  }
  export type Result = Either<AppError, Role>
}