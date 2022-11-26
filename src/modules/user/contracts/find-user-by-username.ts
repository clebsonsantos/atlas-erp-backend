import { Either } from '@/shared/either' 
import { AppError } from "@/shared/errors/AppError" 
import { User } from "../infra/typeorm/entities/user" 

export namespace FindUserByUsername {
  export type Input = {
    username: string
  }
  export type Output = Either<AppError, User>
}