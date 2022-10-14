
import { Request, Response } from "express" 
import { container } from "tsyringe"
import { UpdateAdministratorCompanyUseCase } from "../usecases/update-administrator-company"

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
    
    const { path } = request.file
    const url_image = path

    const updateadmin = container.resolve(UpdateAdministratorCompanyUseCase)

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

    if(result.isLeft()){
      return response.status(result.value.statusCode).json(result.value)
    }

    return response.status(200).json(result.value)
  }
}