import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class GetAllUsersUseCase {
  async execute(id: string): Promise<User[]> {

    const users: Array<User>[] | any = 
        id ? (await UserRepository().findOne({ id }, { relations: ["permissions", "roles"] })) : (await UserRepository().find({
      relations: ["permissions", "roles"]
    }))
    return users
  }
}
