
import { Request, Response } from "express";
import { CreateAdministratorUseCase } from '../../usecases/administrator/CreateAdministratorUseCase';



export class CreateAdministratorController {

  async handle(request: Request, response: Response) {
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
      email,
      
    } = request.body;
    const {path} = request.file
    const url_image = path

    const createAdminController = new CreateAdministratorUseCase()

    const result = await createAdminController.execute({
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
      url_image
    })

    if(result instanceof Error){
    return response.status(400).json(result.message)

    }

    return response.status(200).json(result)
  }
}