import { CategoryRepository } from "@/domain/contracts/repositories"
import { CreateCategory } from "@/domain/contracts/usecases"
import { Category } from "@/domain/entities"
import { getRepository } from "typeorm"

export class CategoryRepositoryImpl implements CategoryRepository {
  
  async findById(id: string): Promise<Category> {
    const repository = getRepository(Category)
    return await repository.findOne({ id })
  }

  async list(): Promise<Category[]> {
    const repository = getRepository(Category)
    const categories = await repository.find({
      order: {
      created_at: "DESC",
      name: "ASC"
    }})
    return categories
  }

  async add(data: CreateCategory.Input): Promise<Category> {
    const repository = getRepository(Category)
    const category = repository.create(data)
    const categorySave = await repository.save(category)
    return categorySave
  }
  
  async findByName(name: string): Promise<Category> {
    const repository = getRepository(Category)
    const category = await repository.findOne({ name })
    return category
  }

  async update(data: Category): Promise<Category> {
    const repository = getRepository(Category)
    return await repository.save(data)
  }

  async delete(id: string): Promise<boolean> {
    const repository = getRepository(Category)
    try {
      await repository.delete({ id })
      return true
    } catch {
      return false
    }
  }
}