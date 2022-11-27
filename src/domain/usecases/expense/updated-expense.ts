import { ExpenseRepository } from "@/domain/contracts/repositories"
import { UpdatedExpense } from "@/domain/contracts/usecases/expense"
import { Failure } from "@/domain/errors"
import { left, right } from "@/shared/either" 

export class UpdateExpensesUseCase implements UpdatedExpense {
  constructor(
    private readonly expenseRepository: ExpenseRepository
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
  }: UpdatedExpense.Input): Promise<UpdatedExpense.Output> {
    const expense = await this.expenseRepository.findById(id)
    if(!expense){
      return left(new Failure("Register not found"))
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
