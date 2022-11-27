import { Either, left, right } from "@/shared/either" 
import { CategoryRepository, ExpenseRepository, CenterCostRepository } from "@/domain/contracts/repositories"
import { CreateExpense } from "@/domain/contracts/usecases/expense"
import { Failure, RequiredFieldError } from "@/domain/errors"

export class CreateExpenseUseCase implements CreateExpense {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly centerCostRepository: CenterCostRepository,
    private readonly categoryRepository: CategoryRepository
  ){}

  async execute(input: CreateExpense.Input): Promise<CreateExpense.Output>{
    const validate = this.validate(input.description, input.amount, input.quantity, input.frequency, input.type, input.date)
    if (validate.isLeft()) {
      return left(new RequiredFieldError(validate.value))
    }
    if(!await this.centerCostRepository.findById(input.center_cost_id)){
      return left(new Failure("Center cost does not exists"))
    }
    if(!await this.categoryRepository.findById(input.category_id)){
      return left(new Failure("Category does not exists"))
    }
    const expense = await this.expenseRepository.add({ ...input })
    return right(expense)
  }
  
  validate(description: string, amount: number, quantity: number, frequency: string, type: string, date: Date): Either<string, null> {
    if (!description || description.length < 5) {
      return left("description")
    }
    if (!amount || !isFinite(amount)) {
      return left("amount")
    }
    if (!quantity || !isFinite(quantity)) {
      return left("quantity")
    }
    if (!frequency) {
      return left("frequency")
    }
    if (!type) {
      return left("type")
    }
    if (!date || !isNaN(date.valueOf())) {
      return left("date")
    }
    return right(null)
  }
}