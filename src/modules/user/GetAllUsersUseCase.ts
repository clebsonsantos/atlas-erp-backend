import { inject, injectable } from "tsyringe";
import { User } from "./infra/typeorm/entities/user";
import { IUserRepository } from "./repositories/iuser-reposiotry";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = this.userRepository.findAll()
    return users
  }
}
