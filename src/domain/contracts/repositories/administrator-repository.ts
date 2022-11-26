import { AdminDTO } from "@/domain/entities"
import { Administrator } from "@/infra/database/entities"

export interface AdministratorRepository {
  add(data: AdminDTO): Promise<Administrator>
  delete?(id: string): Promise<boolean>
  list(): Promise<Administrator[]>
  findById(id: string): Promise<Administrator>
  update(data: AdminDTO): Promise<Administrator>
}
