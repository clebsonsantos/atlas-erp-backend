
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { CreateAdministratorUseCase } from "../usecases/create-adminitrator-company"

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
      email
    } = request.body 
    const { path } = request.file
    const url_image = path

    const createAdminController = container.resolve(CreateAdministratorUseCase)

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

    if(result.isLeft()){
    return response.status(result.value.statusCode).json(result.value)

    }
    return response.status(200).json(result.value)
  }
}