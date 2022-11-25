import { Controller } from "@/presentation/controllers/controller"
import { UpdateAdministratorCompany } from "@/domain/contracts/usecases/administrator"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class UpdateAdministratorController extends Controller {
  constructor(private readonly administrationUpdateService: UpdateAdministratorCompany){
    super()
  }
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
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
    } = httpRequest.body 
    const { path } = httpRequest.file
    const url_image = path

    const result = await this.administrationUpdateService.execute({
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
      return badRequest(result.value)
    }

    return ok(result.value)
  }
}