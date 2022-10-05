import { CreateCategory } from "../contracts/create-category";
import { Category } from "../infra/typeorm/entities/category";

export interface ICategoryRepository {
  list(): Promise<Category[]>
  add(data: CreateCategory.Params): Promise<Category>
  findByName(name: string): Promise<Category>
  findById(id: string): Promise<Category>
  update(data: Category): Promise<Category>
  delete(id: string): Promise<boolean>
}