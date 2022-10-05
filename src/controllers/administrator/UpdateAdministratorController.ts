
import { Request, Response } from "express" 
import { UpdateAdministratorUseCase } from '../../modules/administrator/UpdateAdministratorUseCase' 


export class UpdateAdministratorController {

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const {
      razao,
      fantasia,
      cpf_cnpj,
      insc_estadual,
      endereco,
      bairro,
      numero,
      complemento,
      cidade,
      uf,
      cep,
      telefone,
      email
    } = request.body 
    
    const {path} = request.file
    const url_image = path

    const updateadmin = new UpdateAdministratorUseCase()

    const result = await updateadmin.execute({
      id,
      razao,
      fantasia,
      cpf_cnpj,
      insc_estadual,
      endereco,
      bairro,
      numero,
      complemento,
      cidade,
      uf,
      cep,
      telefone,
      email,
      url_image})

    if(result instanceof Error){
      return response.status(400).json(result.message)
    }

    return response.status(200).json(result)
  }

}