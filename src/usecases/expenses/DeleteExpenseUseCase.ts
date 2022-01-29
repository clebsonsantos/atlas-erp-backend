import { ExpenseRepository } from '../../repositories';

type Type = {
  id: string
}


export class DeleteExpenseUseCase  {

  async execute({id}: Type){
    const expense = await ExpenseRepository().findOne({id})

    if(!expense){
      return new Error("Registro não encontrado.");
    }

    ExpenseRepository().delete({id})
    
  }
}
