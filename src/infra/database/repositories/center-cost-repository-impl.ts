import { CreateCenterCost } from "@/domain/contracts/usecases" 
import { CenterCostRepository } from "@/domain/contracts/repositories" 
import { CentersCost } from "@/infra/database/entities" 

import { getRepository } from "typeorm"
 
export class CenterCostRepositoryImpl implements CenterCostRepository {

  async findById(id: string): Promise<CentersCost> {
    const repository = getRepository(CentersCost)
    return await repository.findOne({ id })
  }

  async list(): Promise<CentersCost[]> {
    const repository = getRepository(CentersCost)
    const centersCost = await repository.find({order: {
      created_at: "DESC"
    }})
    return centersCost
  }

  async add(data: CreateCenterCost.Input): Promise<CentersCost> {
    const repository = getRepository(CentersCost)
    const center = repository.create(data)
    const centerSave = await repository.save(center)
    return centerSave
  }
  
  async findByName(name: string): Promise<CentersCost> {
    const repository = getRepository(CentersCost)
    const centerCost = await repository.findOne({ name })
    return centerCost
  }

  async update(data: CentersCost): Promise<CentersCost> {
    const repository = getRepository(CentersCost)
    return await repository.save(data)
  }

  async delete(id: string): Promise<boolean> {
    const repository = getRepository(CentersCost)
    try {
      await repository.delete({ id })
      return true
    } catch {
      return false
    }
  }
}