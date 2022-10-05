import { CreateUser } from "../contracts/create-user" 
import { User } from "../infra/typeorm/entities/user" 

export interface IUserRepository {
  findByUserName: (username: string) => Promise<User>
  create: (data: CreateUser.Params) => Promise<User>
  findById: (id: string) => Promise<User>
  update: (data: User) => Promise<User>
  findAll: () => Promise<User[]>
  removeById: (id: string) => Promise<boolean>
}