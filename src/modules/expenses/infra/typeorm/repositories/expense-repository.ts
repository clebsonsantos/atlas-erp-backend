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

}