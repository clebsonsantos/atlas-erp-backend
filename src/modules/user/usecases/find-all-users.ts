import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/user";
import { IUserRepository } from "../repositories/iuser-repository";

@injectable()
export class FindAllUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = this.userRepository.findAll()

    if(users instanceof Array){
      users.forEach((user) => {
        delete user.password 
      })
     }
    return users
  }
}
