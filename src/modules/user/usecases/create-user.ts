import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { CreateUser } from "../contracts/create-user"
import { IUserRepository } from "../repositories/iuser-repository"


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ password, username, full_name, email, phone }: CreateUser.Input): Promise<CreateUser.Output> {
    const validateInput = this.validateInput({ password, username, full_name, email, phone })

    if(validateInput.isLeft()) {
      return left(new AppError(validateInput.value, 400))
    }

    const existUser = await this.userRepository.findByUserName(username)

    if (existUser) {
      return left(new AppError("Usuário já existe!", 400))
    }

    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.create({ username, password: passwordHash, full_name, email, phone })

    return right(user)
  }

  validateInput(data: CreateUser.Input): Either<string, null> {
    let messageError = `Input is required: `
    if(!data.email) {
      return left(messageError + "email")
    }
    if(!data.username) {
      return left(messageError + "username")
    }
    if(!data.full_name) {
      return left(messageError + "full_name")
    }
    if(!data.password) {
      return left(messageError + "password")
    }
    if(!data.phone) {
      return left(messageError + "phone")
    }
    return right(null)
  }
}
