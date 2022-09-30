import { inject, injectable } from "tsyringe";
import { User } from "./infra/typeorm/entities/user";
import { IUserRepository } from "./repositories/iuser-reposiotry";

@injectable()
export class FindOneUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(username: string): Promise<User> {
    const users = await this.userRepository.findByUserName(username)
    return users
  }
}
