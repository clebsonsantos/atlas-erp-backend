import { AdministratorRepository } from "@/domain/contracts/repositories"
import { LoadAdministrator } from "@/domain/contracts/usecases/administrator"

type Output = LoadAdministrator.Result
export class LoadAdministratorCompany implements LoadAdministrator {
  constructor(
    private readonly administratorRepository: AdministratorRepository
  ){}

  async execute(): Promise<Output>{
    const administrator = await this.administratorRepository.list()
    return administrator
  } 
}
