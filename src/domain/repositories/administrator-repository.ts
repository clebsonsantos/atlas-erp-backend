import { Administrator, Admin } from "@/domain/entities"

export interface AdministratorRepository {
  add(data: Admin): Promise<Administrator>
  delete?(id: string): Promise<boolean>
  list(): Promise<Administrator[]>
  findById(id: string): Promise<Administrator>
  update(data: Admin): Promise<Administrator>
}
