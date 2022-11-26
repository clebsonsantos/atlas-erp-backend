import { CreateCenterCost } from "../contracts/create-center-cost"
import { CentersCost } from "../infra/typeorm/entities/center-cost"


export interface ICenterCostRepository {
  list(): Promise<CentersCost[]>
  add(data: CreateCenterCost.Input): Promise<CentersCost>
  findByName(name: string): Promise<CentersCost>
  findById(id: string): Promise<CentersCost>
  update(data: CentersCost): Promise<CentersCost>
  delete(id: string): Promise<boolean>
}