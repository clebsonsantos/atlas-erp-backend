import { Category } from "@/domain/entities"
import { CreateCategory } from "@/domain/contracts/usecases/category"

export interface CategoryRepository {
  list(): Promise<Category[]>
  add(data: CreateCategory.Params): Promise<Category>
  findByName(name: string): Promise<Category>
  findById(id: string): Promise<Category>
  update(data: Category): Promise<Category>
  delete(id: string): Promise<boolean>
}