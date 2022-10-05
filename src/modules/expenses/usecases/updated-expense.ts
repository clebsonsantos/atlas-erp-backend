import { left, right } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { inject, injectable } from "tsyringe" 
import { UpdatedExpense } from "../contracts/updated-expense" 
import { IExpenseRepository } from "../repositories/iexpense-repository" 

@injectable()
export class UpdateExpensesUseCase  {
  constructor(
    @inject("ExpenseRepository")
    private readonly expenseRepository: IExpenseRepository
  ){}

  async execute({
    id,
    description,
    quantity,
    amount,
    frequency,
    type,
    date,
    center_cost_id,
    category_id
  }: UpdatedExpense.Params): Promise<UpdatedExpense.Result> {

    const expense = await this.expenseRepository.findById(id)

    if(!expense){
      return left(new AppError('Despesa não encontrada.', 404))
    }

    expense.description = description ? description : expense.description 
    expense.quantity = quantity ? quantity : expense.quantity 
    expense.amount = amount ? amount : expense.amount 
    expense.frequency = frequency ? frequency : expense.frequency 
    expense.type = type ? type  : expense.type 
    expense.date = date ? date  : expense.date 
    expense.center_cost_id = center_cost_id ? center_cost_id : expense.center_cost_id 
    expense.category_id = category_id ? category_id : expense.category_id 

    const result = await this.expenseRepository.update(expense)

    return right(result)
  }
}
