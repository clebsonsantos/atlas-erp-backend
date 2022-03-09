import { CustomerRepository } from '../../repositories';

type Type = {
  id: string
}


export class DeleteCustomerUseCase  {

  async execute({id}: Type){
    const customer = await CustomerRepository().findOne({id})

    if(!customer){
      return new Error("Cliente não encontrado.");
    }

    CustomerRepository().delete({id})
    
  }
}
