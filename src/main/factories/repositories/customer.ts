import { CustomerRepositoryImpl } from "@/infra/database/repositories"

export const makeCustomerRepository = (): CustomerRepositoryImpl => {
  return new CustomerRepositoryImpl()
}