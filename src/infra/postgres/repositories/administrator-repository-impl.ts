import { AdministratorRepository } from "@/domain/contracts/repositories/administrator-repository"
import { Admin, Administrator } from "@/domain/entities"
import { getRepository, Repository } from "typeorm"

export class AdministratorRepositoryImpl implements AdministratorRepository {

  private readonly repository: Repository<Administrator>
  constructor(){
    this.repository = getRepository(Administrator)
  }

  async add(data: Admin): Promise<Administrator> {
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