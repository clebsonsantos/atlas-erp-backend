import { Either, left, right } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { inject, injectable } from "tsyringe" 
import { CreateExpense } from "../contracts/create-expense" 
import { CategoryRepository } from "@/domain/contracts/repositories"
import { ICenterCostRepository } from "../repositories/icenter-cost-repository"
import { IExpenseRepository } from "../repositories/iexpense-repository" 

@injectable()
export class CreateExpenseUseCase {
  constructor(
    @inject("ExpenseRepository")
    private readonly expenseRepository: IExpenseRepository,
    @inject("CenterCostRepository")
    private readonly centerCostRepository: ICenterCostRepository,
    @inject("CategoryRepository")
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute({
    description,
    amount,
    quantity,
    frequency,
    type,
    date,
    center_cost_id,
    category_id
  }: CreateExpense.Input): Promise<CreateExpense.Output>{
    const validate = this.validate(description, amount, quantity, frequency, type, date)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }
    
    if(!await this.centerCostRepository.findById(center_cost_id)){
      return left(new AppError("Centro de custo não existe!", 404))
    }

    if(!await this.categoryRepository.findById(category_id)){
      return left(new AppError("Categoria não existe!", 404))
    }

    const expense = await this.expenseRepository.add({ 
      description,
      amount,
      quantity,
      frequency,
      type,
      date,
      center_cost_id,
      category_id
    })
    return right(expense)
  }
  
  validate(description: string, amount: number, quantity: number, frequency: string, type: string, date: Date): Either<string, null> {
    const messageError = `Input is required: `
    if (!description || description.length < 5) {
      return left(messageError.concat("description"))
    }
    if (!amount || !isFinite(amount)) {
      return left(messageError.concat("amount"))
    }
    if (!quantity || !isFinite(quantity)) {
      return left(messageError.concat("quantity"))
    }
    if (!frequency) {
      return left(messageError.concat("frequency"))
    }
    if (!type) {
      return left(messageError.concat("type"))
    }
    if (!date || !isNaN(date.valueOf())) {
      return left(messageError.concat("date"))
    }
    return right(null)
  }
}