import { CreateExpense } from "@/modules/expenses/contracts/create-expense";
import { IExpenseRepository } from "@/modules/expenses/repositories/iexpense-repository";
import { getRepository, Repository } from "typeorm";
import { Expenses } from "../entities/expense";


export class ExpenseRepository implements IExpenseRepository {
  
  private repository: Repository<Expenses>
  constructor(){
    this.repository = getRepository(Expenses)
  }

  async add(data: CreateExpense.Params): Promise<Expenses> {
    const toSave = this.repository.create(data)
    const expense = await this.repository.save(toSave)
    return expense
  }

  async list(): Promise<Expenses[]> {
    const expenses = await this.repository.find({
      relations: ["category", "center_cost"]
    })
    return expenses
  }

  async findById(id: string): Promise<Expenses> {
      const expense = await this.repository.findOne({ id })
      return expense
  }

  async update(data: Expenses): Promise<Expenses> {
      const expense = await this.repository.save(data)
      return expense
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete(id)
      return true
    } catch {
      return false
    }
  }
}