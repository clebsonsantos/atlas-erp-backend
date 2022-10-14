import { CreateAdministratorCompany } from "@/modules/administrator/contracts/create-administrator"
import { AdministratorRepository } from "@/modules/administrator/repositories/administrator-repository"
import { getRepository, Repository } from "typeorm"
import { Administrator } from "../entities/adminitrator"


export class AdministratorRepositoryImpl implements AdministratorRepository {

  private readonly repository: Repository<Administrator>
  constructor(){
    this.repository = getRepository(Administrator)
  }

  async add(data: CreateAdministratorCompany.Params): Promise<Administrator> {
    const admin = this.repository.create(data)
    return await this.repository.save(admin)
  }

  async list(): Promise<Administrator[]> {
    return await this.repository.find()
  }

  async update(data: Administrator): Promise<Administrator> {
    return await this.repository.save(data)
  }

  async findById(id: string): Promise<Administrator> {
    return await this.repository.findOne({ id })
  }
}