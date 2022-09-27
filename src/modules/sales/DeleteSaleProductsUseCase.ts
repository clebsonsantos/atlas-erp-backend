import { ProductsSoldsRepository, SalesRepository } from '../../repositories'

type Type = {
  id: string
}


export class DeleteSaleProductsUseCase  {

  async execute({ id }: Type): Promise< any | Error> {

    const sale = await SalesRepository().findOne({id}, { relations: ["products_sold"]})
    if(!sale){
      return new Error("Pedido de venda não encontrado.")
    }
    
    SalesRepository().delete({id})
    sale.products_sold.forEach(async item=> {
      ProductsSoldsRepository().delete({id: item.id})
    })

    return "Pedido de venda deletado com sucesso."

  }
}
