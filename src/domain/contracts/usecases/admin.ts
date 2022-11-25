import { Admin } from "@/domain/entities"
import { Either } from "@/shared/either"
import { InvalidFieldError, Failure } from "@/domain/errors"

export interface CreateAdministratorCompany {
  execute: (data: CreateAdministratorCompany.Params) => Promise<CreateAdministratorCompany.Result>
}

export namespace CreateAdministratorCompany {
  export type Params = {
    razao: string 
    fantasia: string 
    cpf_cnpj: string 
    insc_estadual: string 
    endereco: string 
    bairro: string 
    numero: string 
    complemento: string 
    cidade: string 
    uf: string 
    cep: string 
    telefone: string 
    email: string 
    url_image: string
    id?: string
    created_at?: Date
  }
  export type Result = Either<string, Admin>
}


export interface LoadAdministrator {
  execute: () => Promise<LoadAdministrator.Result>
}
export namespace LoadAdministrator {
  export type Result = Admin[]
}


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