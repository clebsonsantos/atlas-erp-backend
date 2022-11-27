import { ExpenseRepository } from "@/domain/contracts/repositories"
import { DeleteExpense } from "@/domain/contracts/usecases/expense"
import { Failure, RelationshipError } from "@/domain/errors"
import { left, right } from "@/shared/either"

export class DeleteExpenseUseCase implements DeleteExpense {
  constructor(
    private readonly expenseRepository: ExpenseRepository
  ){}

  async execute({ id }: DeleteExpense.Input): Promise<DeleteExpense.Output>{
    const expense = await this.expenseRepository.findById(id)
    if(!expense){
      return left(new Failure("Register not found"))
    }
    const result = await this.expenseRepository.delete(id)
    if (!result) {
      return left(new RelationshipError())
    }
    return right("Success")
  }
}
