import { AdministratorRepository } from "@/domain/contracts/repositories"
import { AdminDTO } from "@/domain/entities"
import { Administrator } from "@/infra/database/entities"
import { getRepository } from "typeorm"

export class AdministratorRepositoryImpl implements AdministratorRepository {

  async add(data: AdminDTO): Promise<Administrator> {
    const repository = getRepository(Administrator)

    const admin = repository.create(data)
    return await repository.save(admin)
  }

  async list(): Promise<Administrator[]> {
    const repository = getRepository(Administrator)

    return await repository.find()
  }

  async update(data: AdminDTO): Promise<Administrator> {
    const repository = getRepository(Administrator)

    return await repository.save(data)
  }

  async findById(id: string): Promise<Administrator> {
    const repository = getRepository(Administrator)

    return await repository.findOne({ id })
  }
}