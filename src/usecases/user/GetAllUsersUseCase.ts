import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class GetAllUsersUseCase {
  async execute(id: string): Promise<User[] | User> {

    const users = 
        id ? (await UserRepository().findOne({ id }, { relations: ["permissions", "roles"] })) : (await UserRepository().find({
      relations: ["permissions", "roles"]
    }))
    return users
  }
}
