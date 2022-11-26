import { CategoryDTO } from "@/domain/entities"
import { CreateCategory } from "@/domain/contracts/usecases"

export interface CategoryRepository {
  list(): Promise<CategoryDTO[]>
  add(data: CreateCategory.Input): Promise<CategoryDTO>
  findByName(name: string): Promise<CategoryDTO>
  findById(id: string): Promise<CategoryDTO>
  update(data: CategoryDTO): Promise<CategoryDTO>
  delete(id: string): Promise<boolean>
}