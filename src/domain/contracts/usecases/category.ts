import { Category } from "@/domain/entities"
import { AlreadyExists, Failure, InvalidFieldError } from "@/domain/errors"
import { Either } from "@/shared/either"

type Invalid = InvalidFieldError | AlreadyExists | Failure

export interface CreateCategory {
  execute: (data: CreateCategory.Params) => Promise<CreateCategory.Result>
}
export namespace CreateCategory {
  export type Params = {
    name: string
    id?: string
    created_at?: Date
  }
  export type Result = Either<Invalid, Category>
}

export interface UpdatedCategory {
  execute: (data: UpdatedCategory.Params) => Promise<UpdatedCategory.Result>
}
export namespace UpdatedCategory {
  export type Params = {
    id: string
    name: string
  }
  export type Result = Either<Invalid, Category>
}

export interface DeleteCategory {
  execute: (data: DeleteCategory.Params) => Promise<DeleteCategory.Result>
}
export namespace DeleteCategory {
  export type Params = {
    id: string
  }
  export type Result = Either<Invalid, string>
}