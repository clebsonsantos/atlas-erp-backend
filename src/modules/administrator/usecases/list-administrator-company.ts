import { inject, injectable } from "tsyringe"
import { Administrator } from "../infra/typeorm/entities/adminitrator" 
import { AdministratorRepository } from "../repositories/administrator-repository"

@injectable()
export class ListAdministratorCompanyUseCase {
  constructor(
    @inject("AdministratorRepository")
    private readonly administratorRepository: AdministratorRepository
  ){}

  async execute(): Promise<Administrator[]>{
    const administrator = await this.administratorRepository.list()
    return administrator
  } 
}
