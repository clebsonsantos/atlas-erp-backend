import { left, right } from "@/shared/either"
import { CreateAdministratorCompany as Interface } from "@/domain/contracts/usecases/administrator"
import { CPFCNPJValidator } from "@/domain/contracts/gateways/cpf-cnpj-validator"
import { AdministratorRepository } from "@/domain/contracts/repositories/administrator-repository"
import { Administrator } from "@/domain/entities"

type Input = Interface.Params
type Output = Interface.Result

export class CreateAdministratorCompany implements Interface {
  constructor(
    private readonly administratorRepository: AdministratorRepository,
    private readonly documentValidator: CPFCNPJValidator
  ){}

  async execute(data: Input): Promise<Output>  {
    const admin = await this.administratorRepository.list()
    if(admin.length == 1){
      return left("Só é possivel que haja uma empresa administradora cadastrada.")
    }

    const validateCnpjCpf = this.documentValidator.validate(data.cpf_cnpj.toString())
    if (!validateCnpjCpf) {
      return left("Insira um cpf_cnpj válido")
    }
    
    const company = new Administrator(data)

    if (!company.isValid()){
      return left("Os dados inseridos são inválidos")
    }
    const administrator = await this.administratorRepository.add(company.getValue())
    return right(administrator)
  }
}
