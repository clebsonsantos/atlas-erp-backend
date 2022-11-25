import { Admin } from "@/domain/entities"
import { InvalidFieldError, Failure } from "@/domain/errors"
import { Either } from "@/shared/either"

export interface UpdateAdministratorCompany {
  execute: (data: UpdateAdministratorCompany.Params) => Promise<UpdateAdministratorCompany.Result>
}

export namespace UpdateAdministratorCompany {
  export type Params = {
    id: string 
    razao?: string 
    fantasia?: string 
    cpf_cnpj?: string 
    insc_estadual?: string 
    endereco?: string 
    bairro?: string 
    numero?: string 
    complemento?: string 
    cidade?: string 
    uf?: string 
    cep?: string 
    telefone?: string 
    email?: string 
    url_image?: string 
  }
  export type Result = Either<InvalidFieldError | Failure, Admin>
}