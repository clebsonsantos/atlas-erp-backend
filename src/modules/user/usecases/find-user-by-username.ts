import { left, right } from "@/shared/either";
import { inject, injectable } from "tsyringe";
import { FindUserByUsername } from "../contracts/find-user-by-username";
import { User } from "../infra/typeorm/entities/user";
import { IUserRepository } from "../repositories/iuser-reposiotry";

@injectable()
export class FindUserByUsernameUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ username }: FindUserByUsername.Params): Promise<FindUserByUsername.Result> {
    const user = await this.userRepository.findByUserName(username)
    if (!user) {
      return left(new Error("Usuário não existe"))
    }
    return right(user)
  }
}
