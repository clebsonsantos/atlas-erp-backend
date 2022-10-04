import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Role } from "../infra/typeorm/entities/role"


export namespace CreateRolePermission {
  export type Params = {
    roleId: string
    permissions: string[]
  }
  export type Result = Either<AppError, Role>
}