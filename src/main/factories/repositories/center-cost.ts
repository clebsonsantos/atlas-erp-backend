import { CenterCostRepositoryImpl } from "@/infra/database/repositories"

export const makeCenterCostRepository = (): CenterCostRepositoryImpl => {
  return new CenterCostRepositoryImpl()
}