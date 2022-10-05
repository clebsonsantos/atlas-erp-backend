import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Permission } from "../infra/typeorm/entities/permission"

export namespace CreatePermission {
  export type Params = {
    name: string
    description: string
  }
  export type Result = Either<AppError, Permission>
}