import { CreateAdministratorCompany } from "../contracts/create-administrator"
import { Administrator } from "../infra/typeorm/entities/adminitrator"

export interface AdministratorRepository {
  add(data: CreateAdministratorCompany.Params): Promise<Administrator>
  delete(id: string): Promise<boolean>
  list(): Promise<Administrator[]>
  update(data: Administrator): Promise<Administrator>
}
