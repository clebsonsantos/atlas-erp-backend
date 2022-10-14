import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { cnpj, cpf } from "cpf-cnpj-validator"
import { inject, injectable } from "tsyringe"
import { UpdateAdministratorCompany } from "../contracts/update-administrator-company"
import { AdministratorRepository } from "../repositories/administrator-repository"


@injectable()
export class UpdateAdministratorCompanyUseCase {
  constructor(
    @inject("AdministratorRepository")
    private readonly administratorRepository: AdministratorRepository
  ){}

  async execute({
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
    telefone,
    email,
    url_image
   }: UpdateAdministratorCompany.Params): Promise<UpdateAdministratorCompany.Result>{
    const administrator = await this.administratorRepository.findById(id)

    if(!administrator){
      return left(new AppError("Administrador não existe.")) 
    }
    

    if(cpf_cnpj){
      const validate = this.validateCnpjCpf(cpf_cnpj.toString())
      if (!validate) {
        return left(new AppError("Insira um cpf_cnpj válido")) 
      }
    }

    administrator.razao = razao ? razao : administrator.razao
    administrator.fantasia = fantasia ? fantasia : administrator.fantasia
    administrator.cpf_cnpj = cpf_cnpj ? cpf_cnpj : administrator.cpf_cnpj
    administrator.insc_estadual = insc_estadual ? insc_estadual : administrator.insc_estadual
    administrator.endereco = endereco ? endereco : administrator.endereco
    administrator.bairro = bairro ? bairro : administrator.bairro
    administrator.numero = numero ? numero : administrator.numero
    administrator.complemento = complemento ? complemento : administrator.complemento
    administrator.cidade = cidade ? cidade : administrator.cidade
    administrator.uf = uf ? uf : administrator.uf
    administrator.telefone = telefone ? telefone : administrator.telefone
    administrator.email = email ? email : administrator.email
    administrator.url_image = url_image ? url_image : administrator.url_image

    await this.administratorRepository.update(administrator)
    return right(administrator)
  }

  validateCnpjCpf(doc: string) {
    if (doc.length === 14) {
      return cnpj.isValid(doc)
    }
    if (doc.length === 11) {
      return cpf.isValid(doc)
    }
    return false
  }
}
