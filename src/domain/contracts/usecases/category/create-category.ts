import { Category } from "@/domain/entities"
import { AlreadyExists, Failure, InvalidFieldError } from "@/domain/errors"
import { Either } from "@/shared/either"

export interface CreateCategory {
  execute: (data: CreateCategory.Params) => Promise<CreateCategory.Result>
}

export namespace CreateCategory {
  export type Params = {
    name: string
    id?: string
    created_at?: Date
  }
  export type Result = Either<InvalidFieldError | AlreadyExists | Failure, Category>
}