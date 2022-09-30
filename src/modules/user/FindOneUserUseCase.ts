import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class FindOneUserUseCase {
  async execute(username: string): Promise<User> {

    const users = await UserRepository().findOne({ username }, { relations: ["permissions", "roles"] })
    return users
  }
}
