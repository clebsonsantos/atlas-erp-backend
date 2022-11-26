import { Category } from "@/domain/entities"
import { AlreadyExists, Failure, InvalidFieldError } from "@/domain/errors"
import { Either } from "@/shared/either"

type Invalid = InvalidFieldError | AlreadyExists | Failure

export interface CreateCategory {
  execute: (data: CreateCategory.Input) => Promise<CreateCategory.Output>
}
export namespace CreateCategory {
  export type Input = {
    name: string
    id?: string
    created_at?: Date
  }
  export type Output = Either<Invalid, Category>
}

export interface UpdatedCategory {
  execute: (data: UpdatedCategory.Input) => Promise<UpdatedCategory.Output>
}
export namespace UpdatedCategory {
  export type Input = {
    id: string
    name: string
  }
  export type Output = Either<Invalid, Category>
}

export interface DeleteCategory {
  execute: (data: DeleteCategory.Input) => Promise<DeleteCategory.Output>
}
export namespace DeleteCategory {
  export type Input = {
    id: string
  }
  export type Output = Either<Invalid, string>
}

export interface LoadCategories {
  execute:  () => Promise<LoadCategories.Output>
}
export namespace LoadCategories {
  export type Output = Category[]
}