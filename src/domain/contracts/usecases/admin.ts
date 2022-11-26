import { AdminDTO } from "@/domain/entities"
import { Either } from "@/shared/either"
import { InvalidFieldError, Failure } from "@/domain/errors"

export interface CreateAdministratorCompany {
  execute: (data: CreateAdministratorCompany.Input) => Promise<CreateAdministratorCompany.Output>
}

export namespace CreateAdministratorCompany {
  export type Input = {
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
  export type Output = Either<string, AdminDTO>
}


export interface LoadAdministrator {
  execute: () => Promise<LoadAdministrator.Output>
}
export namespace LoadAdministrator {
  export type Output = AdminDTO[]
}


export interface UpdateAdministratorCompany {
  execute: (data: UpdateAdministratorCompany.Input) => Promise<UpdateAdministratorCompany.Output>
}
export namespace UpdateAdministratorCompany {
  export type Input = {
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
  export type Output = Either<InvalidFieldError | Failure, AdminDTO>
}