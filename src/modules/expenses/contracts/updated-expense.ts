import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Expenses } from "../infra/typeorm/entities/expense"

export namespace UpdatedExpense {
  export type Input = Omit<Expenses, "category" | "center_cost" | "created_at">
  export type Output = Either<AppError, Expenses>
}