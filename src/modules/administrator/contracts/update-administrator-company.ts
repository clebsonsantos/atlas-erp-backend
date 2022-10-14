import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Administrator } from "../infra/typeorm/entities/adminitrator"

export namespace UpdateAdministratorCompany {
  export type Params = {
    id: string 
    razao?: string 
    fantasia?: string 
    cpf_cnpj?: number 
    insc_estadual?: number 
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
  export type Result = Either<AppError, Administrator>
}