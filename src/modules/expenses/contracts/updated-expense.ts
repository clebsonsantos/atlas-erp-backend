import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Expenses } from "../infra/typeorm/entities/expense"

export namespace UpdatedExpense {
  export type Params = Omit<Expenses, "category" | "center_cost" | "created_at">
  export type Result = Either<AppError, Expenses>
}