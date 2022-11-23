import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { CreateAdministratorCompany as Interface } from "@/domain/contracts/usecases/administrator"
import { CPFCNPJValidator } from "@/domain/contracts/gateways/cpf-cnpj-validator"
import { AdministratorRepository } from "@/domain/repositories/administrator-repository"
import { Administrator } from "@/domain/entities"

type Input = Interface.Params
type Output = Interface.Result

export class CreateAdministratorCompany  {
  constructor(
    private readonly administratorRepository: AdministratorRepository,
    private readonly documentValidator: CPFCNPJValidator
  ){}

  async execute(data: Input): Promise<Output>  {
    const admin = await this.administratorRepository.list()
    if(admin.length == 1){
      return left(new AppError("Só é possivel que haja uma empresa administradora cadastrada."))
    }

    const validateCnpjCpf = this.documentValidator.validate(data.cpf_cnpj.toString())
    if (!validateCnpjCpf) {
      return left(new AppError("Insira um cpf_cnpj válido"))
    }
    
    const { email, telefone, bairro, cep, cidade, complemento, numero, endereco, uf, ...args } = data
    const contact = {
      email,
      telefone  
    }
    const address = {
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      complemento: complemento,
      endereco: endereco,
      numero: numero,
      uf: uf
    }
    const company = new Administrator({ 
      contact, 
      address, 
      ...args 
    })

    if (company.isValid()){
      return left(new AppError("Os dados inseridos são inválidos"))
    }
    const administrator = await this.administratorRepository.add(company.getValue())
    return right(administrator)
  }
}
