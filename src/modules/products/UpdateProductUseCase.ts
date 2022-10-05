import { ProductRepository } from '../../repositories' 
import { Product } from "./infra/typeorm/entities/product" 

type IProduct = {
  id: string 
  name: string 
  description: string 
  price_default: number 
  center_cost_id: string
}


export class UpdateProductUseCase  {

  async execute({id, name, description, price_default, center_cost_id}: IProduct): Promise< Product | Error> {


    const productsRepository = ProductRepository() 

    const prodcut = await productsRepository.findOne({id})

    if(!prodcut){
      return new Error('Produto não encontrada.')
    }

    prodcut.name = name ? name : prodcut.name 
    prodcut.description = description ? description : prodcut.description 
    prodcut.price_default = price_default ? price_default : prodcut.price_default 
    prodcut.center_cost_id = center_cost_id ? center_cost_id : prodcut.center_cost_id 

    productsRepository.save(prodcut)

    return prodcut
    
  }
}
