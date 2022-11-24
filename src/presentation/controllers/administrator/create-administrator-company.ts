import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"
import { CreateAdministratorCompany } from "@/domain/contracts/usecases/administrator"

export class CreateAdministratorController extends Controller{
  constructor(private readonly createAdminService: CreateAdministratorCompany){
    super()
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
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

    const result = await this.createAdminService.execute({
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
      url_image: path
    })

    if(result.isLeft()){
      return badRequest(new Error(result.value))

    }
    return ok(result.value)
  }
}