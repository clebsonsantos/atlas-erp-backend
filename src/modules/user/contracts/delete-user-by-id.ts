import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace DeleteUserById {
  export type Params = {
    id: string
  }
  export type Result = Either<AppError, String>
}