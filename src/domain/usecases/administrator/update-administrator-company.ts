import { CPFCNPJValidator } from "@/domain/contracts/gateways"
import { AdministratorRepository } from "@/domain/contracts/repositories"
import { UpdateAdministratorCompany as UpdateAdministrator } from "@/domain/contracts/usecases"
import { Failure, InvalidFieldError } from "@/domain/errors"
import { left, right } from "@/shared/either"

type Input = UpdateAdministrator.Input
type Output = UpdateAdministrator.Output

export class UpdateAdministratorCompany implements UpdateAdministrator {
  constructor(
    private readonly administratorRepository: AdministratorRepository,
    private readonly documentValidator: CPFCNPJValidator
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
   }: Input): Promise<Output>{
    const administrator = await this.administratorRepository.findById(id)

    if(!administrator){
      return left(new Failure("Administrador não existe")) 
    }
    
    if(cpf_cnpj){
      const validate = this.documentValidator.validate(cpf_cnpj)
      if (!validate) {
        return left(new InvalidFieldError("cpf_cnpj")) 
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
    const newAdmin = await this.administratorRepository.update(administrator)

    return right(newAdmin)
  }
}
