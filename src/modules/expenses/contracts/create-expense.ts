import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Expenses } from "../infra/typeorm/entities/expense"

export namespace CreateExpense {
  export type Input = Omit<Expenses, "id" | "created_at" | "category" | "center_cost">
  export type Output = Either<AppError, Expenses>
}