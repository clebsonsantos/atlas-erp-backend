import { CreateCategory } from "@/modules/expenses/contracts/create-category" 
import { ICategoryRepository } from "@/modules/expenses/repositories/icategory-repository" 
import { getRepository, Repository } from "typeorm" 
import { Category } from "../entities/category" 

export class CategoryRepository implements ICategoryRepository {
  
  private readonly repository: Repository<Category>
  constructor(){
    this.repository = getRepository(Category)
  }
  async findById(id: string): Promise<Category> {
    return await this.repository.findOne({ id })
  }
  async list(): Promise<Category[]> {
    const categories = await this.repository.find({order: {
      created_at: "DESC"
    }})
    return categories
  }

  async add(data: CreateCategory.Params): Promise<Category> {
    const category = this.repository.create(data)
    const categorySave = await this.repository.save(category)
    return categorySave
  }
  
  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }

  async update(data: Category): Promise<Category> {
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