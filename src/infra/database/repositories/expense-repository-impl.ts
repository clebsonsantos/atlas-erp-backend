import { ExpenseRepository } from "@/domain/contracts/repositories"
import { Between, getRepository } from "typeorm" 
import { Expenses } from "@/infra/database/entities"
import { CreateExpense } from "@/domain/contracts/usecases/expense"
import { ExpenseDTO } from "@/domain/entities"

export class ExpenseRepositoryImpl implements ExpenseRepository {

  async add(data: CreateExpense.Input): Promise<ExpenseDTO> {
    const repository = getRepository(Expenses)
    const toSave = repository.create(data)
    const expense = await repository.save(toSave)
    return expense
  }

  async list(): Promise<ExpenseDTO[]> {
    const repository = getRepository(Expenses)
    const expenses = await repository.find({
      relations: ["category", "center_cost"]
    })
    return expenses
  }

  async findById(id: string): Promise<ExpenseDTO> {
    const repository = getRepository(Expenses)
    const expense = await repository.findOne({ id })
    return expense
  }

  async update(data: Expenses): Promise<ExpenseDTO> {
    const repository = getRepository(Expenses)
    const expense = await repository.save(data)
    return expense
  }

  async delete(id: string): Promise<boolean> {
    const repository = getRepository(Expenses)
    try {
      await repository.delete(id)
      return true
    } catch {
      return false
    }
  }

  async findByDateOrder(): Promise<ExpenseDTO[]> {
    const repository = getRepository(Expenses)
    const expenses =  await repository.find({
      order: {
        date: "ASC"
      }, 
      relations: ["category", "center_cost"] 
    })
    return expenses
  }

  async findByBetweenData(startDate: Date, endDate: Date): Promise<ExpenseDTO[]> {
    const repository = getRepository(Expenses)
    const expenses = await repository.find({
      order: {date: "ASC"}, 
      where: {date: Between(startDate, endDate)}, 
      relations: ["category", "center_cost"] 
    })
    return expenses
  }
}