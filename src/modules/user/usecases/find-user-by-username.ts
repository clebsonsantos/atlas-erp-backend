import { left, right } from "@/shared/either" 
import { AppError } from "@/shared/errors/AppError" 
import { inject, injectable } from "tsyringe" 
import { FindUserByUsername } from "../contracts/find-user-by-username" 
import { IUserRepository } from "../repositories/iuser-repository" 

@injectable()
export class FindUserByUsernameUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ username }: FindUserByUsername.Params): Promise<FindUserByUsername.Result> {
    const user = await this.userRepository.findByUserName(username)
    if (!user) {
      return left(new AppError("Usuário não existe", 404))
    }
    return right(user)
  }
}
