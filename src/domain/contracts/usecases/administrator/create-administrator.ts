import { Administrator } from "@/domain/entities"
import { Either } from "@/shared/either"

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
  }

  export type Result = Either<string, Administrator>
}