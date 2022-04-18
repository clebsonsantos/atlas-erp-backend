import { hash } from 'bcryptjs';
import { UserRepository } from './../repositories/index';


async function CreateUserSupport() {
  const support = {
    username:  'suporte',
    password:  'support-s_9691',
    full_name: 'Suporte e Manutenção',
    email:     'clebsonsantos.dev@gmail.com',
    phone:     '83993898073',
  }
  const repositore =  UserRepository()
  const user = await repositore.findOne({username: support.username})
  if(user == undefined){
    const passwordHash = await hash(support.password, 8)
    support.password = passwordHash

    const onNewuUser = repositore.create(support)
    repositore.save(onNewuUser)
    console.log("[ Usuário de inicialização criado ]")
    return 
  }
  return 
}

export { CreateUserSupport }

