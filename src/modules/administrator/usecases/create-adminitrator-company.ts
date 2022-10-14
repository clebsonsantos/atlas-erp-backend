import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { CreateAdministratorCompany } from "../contracts/create-administrator"
import { AdministratorRepository } from "../repositories/administrator-repository"
import { cnpj, cpf } from "cpf-cnpj-validator"


@injectable()
export class CreateAdministratorUseCase  {
  constructor(
    @inject("AdministratorRepository")
    private readonly administratorRepository: AdministratorRepository
  ){}

  async execute(data: CreateAdministratorCompany.Params): Promise<CreateAdministratorCompany.Result>  {
    
    const admin = await this.administratorRepository.list()
    if(admin.length == 1){
      return left(new AppError("Só é possivel que haja uma empresa administradora cadastrada."))
    }

    const companyValidate = this.validateParams(data)
    if (companyValidate.isLeft()){
      return left(new AppError(companyValidate.value))
    }

    const validateCnpjCpf = this.validateCnpjCpf(data.cpf_cnpj.toString())
    if (!validateCnpjCpf) {
      return left(new AppError("Insira um cpf_cnpj válido"))
    }

    const administrator = await this.administratorRepository.add(data)
    return right(administrator)
  }

  validateParams(args: CreateAdministratorCompany.Params): Either<string, null> {
    const message = `Params is required: `
    if (!args.cpf_cnpj) {
      return left(message.concat("cpf_cnpj"))
    }
    if (!args.bairro) {
      return left(message.concat("bairro"))
    }
    if (!args.cep) {
      return left(message.concat("cep"))
    }
    if (!args.cidade) {
      return left(message.concat("cidade"))
    }
    if (!args.complemento) {
      return left(message.concat("complemento"))
    }
    if (!args.uf) {
      return left(message.concat("uf"))
    }
    if (!args.email) {
      return left(message.concat("email"))
    }
    if (!args.insc_estadual) {
      return left(message.concat("insc_estadual"))
    }    
    if (!args.numero) {
      return left(message.concat("numero"))
    }    
    if (!args.razao) {
      return left(message.concat("razao"))
    }
    if (!args.telefone) {
      return left(message.concat("telefone"))
    }
    return right(null)
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
