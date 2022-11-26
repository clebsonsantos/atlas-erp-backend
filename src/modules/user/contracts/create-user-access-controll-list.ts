import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { User } from "../infra/typeorm/entities/user"

export namespace CreateUserAccessControllList {
  export type Input = {
    userId: string
    roles: string[]
    permissions: string[]
  }
  export type Output = Either<AppError, User>
}