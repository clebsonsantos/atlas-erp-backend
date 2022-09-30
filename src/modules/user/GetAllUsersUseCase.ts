import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

export class GetAllUsersUseCase {
  async execute(): Promise<User[]> {

   //"roles" relationship removed, returning only the permissions
    const users =  await UserRepository().find({relations: ["permissions"], order: {full_name: "ASC"}})
    return users
  }
}
