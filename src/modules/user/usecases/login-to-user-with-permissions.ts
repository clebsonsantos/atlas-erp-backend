import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "@/shared/errors/AppError"
import { IUserRepository } from "../repositories/iuser-reposiotry"
import { LoginToUser } from "../contracts/login-to-user-with-permissions"
import { left, right } from "@/shared/either"

@injectable()
export class LoginToUserWithPermissions {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ username, password }: LoginToUser.Params): Promise<LoginToUser.Result> {

    const user = await this.userRepository.findByUserName(username)

    if (!user) {
      return left(new AppError("Usuário não existe.", 404))
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return left(new AppError("Digite uma senha válida."))
    }

    const token = sign({}, "" + process.env.SECRET_JWT, {
      subject: user.id,
    })

    if(!user.permissions.length){
      return left(new AppError(`Você precisa ter ao menos uma permissão para acessar o sistema.`))
    }

    return right({ 
      token: token, 
      user_id: user.id,
      user_permissions: user.permissions
    })
  }
}

