import { Administrator } from "@/domain/entities"
import { Either } from "@/shared/either"
export interface CreateAdministratorCompany {
  execute: (data: CreateAdministratorCompany.Params) => Promise<CreateAdministratorCompany.Result>
}
export namespace CreateAdministratorCompany {
  export type Params = {
    razao: string 
    fantasia: string 
    cpf_cnpj: number 
    insc_estadual: number 
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
    id: string
    created_at: Date
  }

  export type Result = Either<string, Administrator>
}