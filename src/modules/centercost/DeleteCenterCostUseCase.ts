import { CenterCostRepository } from '../../repositories';

type Type = {
  id: string
}


export class DeleteCenterCostUseCase  {

  async execute({ id }: Type): Promise< any | Error> {

    let ErrorQuery;

    const center_cost = await CenterCostRepository().findOne({ id })

    if(!center_cost){
      return new Error("Centro de custo não existe");
    }

    await CenterCostRepository().delete({ id }).catch(erro => {
      ErrorQuery = erro.message
    })

    if(ErrorQuery && ErrorQuery.includes("constraint")){
      return new Error("Não é possível deletar esse registro pois existem relacionamentos que dependem dele.")
    }

    return "OK"
    
  }
}
