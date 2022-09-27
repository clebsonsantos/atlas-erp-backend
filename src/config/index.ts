import { CreateUserAccessControlListUseCase } from '../modules/user/CreateUserAccessControlListUseCase';
import { CreatePermissionUseCase } from '../modules/permissions/CreatePermissionUseCase';
import { permissions } from './../utils/permissions';
import { hash } from 'bcryptjs';
import { PermissionRepository, UserRepository } from './../repositories/index';


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
    await repositore.save(onNewuUser)

    const permission = await PermissionRepository().find({where: {name: 'admin'}})
    const permissions = [permission[0].id]
    const userId = onNewuUser.id
    
    const createPermissions = new CreateUserAccessControlListUseCase()
    await createPermissions.execute({userId, roles: [], permissions})
    console.log("[ Usuário de inicialização criado ]")
    return 
  }
  return 
}
async function DefaultPermissionsSystem() {
  for await(const permission of permissions){
    await (new CreatePermissionUseCase()).execute({name: permission.name, description: permission.descripion})
  }
  return true
}

export { CreateUserSupport, DefaultPermissionsSystem }

