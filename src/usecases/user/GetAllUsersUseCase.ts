import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class GetAllUsersUseCase {
  async execute(): Promise<User[]> {

    const users =  await UserRepository().find({relations: ["permissions", "roles"], order: {full_name: "ASC"}})
    return users
  }
}
