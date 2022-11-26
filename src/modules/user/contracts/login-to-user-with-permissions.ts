import { Permission } from "@/modules/permissions/infra/typeorm/entities/permission"
import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace LoginToUser {
  export type Input = {
    username: string
    password: string
  } 
  export type Output = Either<AppError, {
    token: string, 
    user_id: string,
    user_permissions: Permission[]
  }>
} 