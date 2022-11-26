import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { UpdatedUserInfo } from "../contracts/updated-user-info"
import { IUserRepository } from "../repositories/iuser-repository"


@injectable()
export class UpdatedUserInfoUserUseCase  {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, username, password, email, full_name, phone}: UpdatedUserInfo.Input) :  Promise<UpdatedUserInfo.Output> {

    const user = await this.userRepository.findById(id)

    if(!user){
      return left(new AppError("Usuário não encontrado.", 404))
    }

    user.username = username ? username : user.username
    user.full_name = full_name ? full_name : user.full_name
    user.email = email ? email : user.email
    user.phone = phone ? phone : user.phone
    user.password = password ? await hash(password, 8) : user.password

    const userOutput = await this.userRepository.update(user)
    return right(userOutput)
  }
}
