import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Role } from "../infra/typeorm/entities/role"


export namespace CreateRolePermission {
  export type Input = {
    roleId: string
    permissions: string[]
  }
  export type Output = Either<AppError, Role>
}