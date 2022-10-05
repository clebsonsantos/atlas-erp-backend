import { CategoryRepository, CenterCostRepository } from "@/repositories";
import { Either, left, right } from "@/shared/either";
import { AppError } from "@/shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { CreateExpense } from "../contracts/create-expense";
import { IExpenseRepository } from "../repositories/iexpense-repository";

@injectable()
export class CreateExpenseUseCase {
  constructor(
    @inject("ExpenseRepository")
    private readonly expenseRepository: IExpenseRepository
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
  }: CreateExpense.Params): Promise<CreateExpense.Result>{
    const validate = this.validate(description, amount, quantity, frequency, type, date)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }
    
    if(!await CenterCostRepository().findOne({id: center_cost_id})){
      return left(new AppError("Centro de custo não existe!", 404))
    }

    if(!await CategoryRepository().findOne({id: category_id})){
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
    const messageError = `Params is required: `
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
    if (!date || !(date instanceof Date)) {
      return left(messageError.concat("date"))
    }
    return right(null)
  }
}