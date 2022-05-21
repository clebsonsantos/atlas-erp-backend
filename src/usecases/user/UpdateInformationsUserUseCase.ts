import { hash } from "bcryptjs";
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories';

type UsersTypes = {
  id: string
  username: string;
  password: string;
  email: string;
  full_name: string;
  phone: string
}

export class UpdateInformationsUserUseCase  {

  async execute({id, username, password, email, full_name, phone}: UsersTypes) :  Promise< User | Error> {

    const usersRepository = UserRepository()
    const user = await usersRepository.findOne({id})

    if(!user){
      return new Error("Usuário não encontrado.");
    }
    const existUser = await UserRepository().findOne({ username });

    if (existUser) {
      return new Error("Usuário já existe!");
    }

    user.username = username ? username : user.username;
    user.full_name = full_name ? full_name : user.full_name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? await hash(password, 8) : user.password;

    usersRepository.save(user)
    return user
  }
}
