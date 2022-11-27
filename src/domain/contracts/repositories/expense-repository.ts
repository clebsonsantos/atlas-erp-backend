import { ExpenseDTO } from "@/domain/entities"
import { CreateExpense } from "@/domain/contracts/usecases/expense"

export interface ExpenseRepository {
  add(data: CreateExpense.Input): Promise<ExpenseDTO>
  list(): Promise<ExpenseDTO[]>
  findById(id: string): Promise<ExpenseDTO>
  update(data: ExpenseDTO): Promise<ExpenseDTO>
  delete(id: string): Promise<boolean>
  findByDateOrder(): Promise<ExpenseDTO[]>
  findByBetweenData(startDate: Date, endDate: Date): Promise<ExpenseDTO[]>
}