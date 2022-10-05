import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Expenses } from "../infra/typeorm/entities/expense"

export namespace CreateExpense {
  export type Params = Omit<Expenses, "id" | "created_at" | "category" | "center_cost">
  export type Result = Either<AppError, Expenses>
}