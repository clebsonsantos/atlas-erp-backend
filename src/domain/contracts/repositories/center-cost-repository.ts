import { CenterCostDTO } from "@/domain/entities"
import { CreateCenterCost } from "@/domain/contracts/usecases"

export interface CenterCostRepository {
  list(): Promise<CenterCostDTO[]>
  add(data: CreateCenterCost.Input): Promise<CenterCostDTO>
  findByName(name: string): Promise<CenterCostDTO>
  findById(id: string): Promise<CenterCostDTO>
  update(data: CenterCostDTO): Promise<CenterCostDTO>
  delete(id: string): Promise<boolean>
}