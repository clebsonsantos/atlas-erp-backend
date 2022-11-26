import { left, right } from "@/shared/either"
import { CreateAdministratorCompany as Interface } from "@/domain/contracts/usecases"
import { CPFCNPJValidator } from "@/domain/contracts/gateways"
import { AdministratorRepository } from "@/domain/contracts/repositories"
import { Administrator } from "@/domain/entities"
import { v4 as uuid } from "uuid"
type Input = Interface.Input
type Output = Interface.Output

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

    const validateCnpjCpf = this.documentValidator.validate(data.cpf_cnpj)
    if (!validateCnpjCpf) {
      return left("Insira um cpf_cnpj válido")
    }
    
    const company = new Administrator(data)
    //?? é preciso injetar um gateways para gerar o uuid
    company.setIdAndDate(uuid(), new Date())

    if (!company.isValid()){
      return left("Os dados inseridos são inválidos")
    }
    const administrator = await this.administratorRepository.add(company.getValue())
    return right(administrator)
  }
}
