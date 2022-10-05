import { CreateUser } from "@/modules/user/contracts/create-user";
import { IUserRepository } from "@/modules/user/repositories/iuser-repository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/user";


export class UserRepository implements IUserRepository {
  private repository: Repository<User>
  constructor() {
    this.repository = getRepository(User)
  }
  async findByUserName(username: string): Promise<User> {
    const user = await this.repository.findOne({ username }, { relations: ["permissions", "roles"] })
    return user
  }
  async create(data: CreateUser.Params): Promise<User> {
    const create = this.repository.create(data)
    const user = await this.repository.save(create)
    return user
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id }, { relations: ["permissions", "roles"] })
    return user
  }

  async update(data: User): Promise<User> {
    const user = await this.repository.save(data)
    return user
  }

  async findAll(): Promise<User[]> {
    const users = this.repository.find({relations: ["permissions"], order: {full_name: "ASC"}})
    return users
  }

  async removeById(id: string): Promise<boolean> {
    try {
      await this.repository.delete({ id })
      return true
    } catch {
      return false
    }
  }
}