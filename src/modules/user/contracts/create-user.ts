import { Either } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { User } from "../infra/typeorm/entities/user" 

export namespace CreateUser {
  export type Params = Omit<User, "id" | "created_at" | "roles" | "permissions">
  export type Result = Either<AppError, User>
}