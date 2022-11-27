import { ExpenseDTO } from "@/domain/entities"
import { InvalidFieldError, AlreadyExists, Failure } from "@/domain/errors"
import { Either } from "@/shared/either"

type Invalid = InvalidFieldError | AlreadyExists | Failure

export interface CreateExpense {
  execute: (input: CreateExpense.Input) => Promise<CreateExpense.Output>
}
export namespace CreateExpense {
  export type Input = Omit<ExpenseDTO, "id" | "created_at" | "category" | "center_cost">
  export type Output = Either<Invalid, ExpenseDTO>
}

export interface DeleteExpense {
  execute: (input: DeleteExpense.Input) => Promise<DeleteExpense.Output>
}
export namespace DeleteExpense {
  export type Input = {
    id: string
  }
  export type Output = Either<Invalid, string>
}

export interface UpdatedExpense {
  execute: (input: UpdatedExpense.Input) => Promise<UpdatedExpense.Output>
}
export namespace UpdatedExpense {
  export type Input = Omit<ExpenseDTO, "category" | "center_cost" | "created_at">
  export type Output = Either<Invalid, ExpenseDTO>
}

export interface ListExpenses {
  execute: () => Promise<ExpenseDTO[]>
}