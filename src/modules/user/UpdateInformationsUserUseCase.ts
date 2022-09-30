import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { User } from "./infra/typeorm/entities/user";
import { IUserRepository } from "./repositories/iuser-reposiotry";

type UsersTypes = {
  id: string
  username: string;
  password: string;
  email: string;
  full_name: string;
  phone: string
}

@injectable()
export class UpdateInformationsUserUseCase  {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({id, username, password, email, full_name, phone}: UsersTypes) :  Promise< User | Error> {

    const user = await this.userRepository.findById(id)

    if(!user){
      return new Error("Usuário não encontrado.");
    }

    user.username = username ? username : user.username;
    user.full_name = full_name ? full_name : user.full_name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? await hash(password, 8) : user.password;

    const userResult = await this.userRepository.update(user)
    return userResult
  }
}
