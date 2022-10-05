import { CreateExpense } from "../contracts/create-expense";
import { Expenses } from "../infra/typeorm/entities/expense";

export interface IExpenseRepository {
  add(data: CreateExpense.Params): Promise<Expenses>
  list(): Promise<Expenses[]>
}