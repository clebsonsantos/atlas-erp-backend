import { CreateCenterCost } from "@/modules/expenses/contracts/create-center-cost" 
import { ICenterCostRepository } from "@/modules/expenses/repositories/icenter-cost-repository" 
import { getRepository, Repository } from "typeorm" 
import { CentersCost } from "../entities/center-cost" 

export class CenterCostRepository implements ICenterCostRepository {
  
  private readonly repository: Repository<CentersCost>
  constructor(){
    this.repository = getRepository(CentersCost)
  }

  async findById(id: string): Promise<CentersCost> {
    return await this.repository.findOne({ id })
  }

  async list(): Promise<CentersCost[]> {
    const centersCost = await this.repository.find({order: {
      created_at: "DESC"
    }})
    return centersCost
  }

  async add(data: CreateCenterCost.Input): Promise<CentersCost> {
    const center = this.repository.create(data)
    const centerSave = await this.repository.save(center)
    return centerSave
  }
  
  async findByName(name: string): Promise<CentersCost> {
    const centerCost = await this.repository.findOne({ name })
    return centerCost
  }

  async update(data: CentersCost): Promise<CentersCost> {
    return await this.repository.save(data)
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.delete({ id })
      return true
    } catch {
      return false
    }
  }
}