import { CategoryRepository } from '../../repositories';

type Type = {
  id: string;
}


export class DeleteCategoryUseCase  {

  async execute({id}: Type): Promise<Error | any>{
    let ErrorQuery;
    const category = await CategoryRepository().findOne({id})

    if(!category){
      return new Error("Categoria não existe!");

    }
    const deleteRepository =  CategoryRepository()

    await deleteRepository.delete({id}).catch(error => {
      ErrorQuery = error.message
    })
    if( ErrorQuery && ErrorQuery.includes("constraint")){
      return new Error("Não é possível deletar esse registro pois existem relacionamentos que dependem dele.")
    }

    return "OK"
    

    
  }
}
