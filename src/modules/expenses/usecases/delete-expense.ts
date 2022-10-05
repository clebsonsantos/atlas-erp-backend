import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject } from "tsyringe"
import { DeleteExpense } from "../contracts/delete-expense"
import { IExpenseRepository } from "../repositories/iexpense-repository"


export class DeleteExpenseUseCase  {
  constructor(
    @inject("ExpenseRepository")
    private readonly expenseRepository: IExpenseRepository
  ){}

  async execute({ id }: DeleteExpense.Params): Promise<DeleteExpense.Result>{
    const expense = await this.expenseRepository.findById(id)
    if(!expense){
      return left(new AppError("Registro não encontrado.", 404))
    }

    const result = await this.expenseRepository.delete(id)
    if (!result) {
      return left(new AppError("Não é possível deletar esse registro.\nVerifique se há relacionamentos dependentes"))
    }

    return right("Registro deletado com sucesso.")
  }
}
