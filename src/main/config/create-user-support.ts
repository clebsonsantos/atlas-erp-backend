import { container } from 'tsyringe' 

import { hash } from 'bcryptjs' 
import { CreateUserAccessControlListUseCase } from "@/modules/user/usecases/create-user-access-controll-list" 
import { UserRepository } from "@/modules/user/infra/typeorm/repositories/user-repository"
import { PermissionRepository } from "@/modules/permissions/infra/typeorm/repositories/permission-repository"


async function createUserSupport(): Promise<void> {
  const support = {
    username:  'suporte',
    password:  'support-s_9691',
    full_name: 'Suporte e Manutenção',
    email:     'clebsonsantos.dev@gmail.com',
    phone:     '83993898073',
  }
  const userRepository = new UserRepository()
  const user = await userRepository.findByUserName(support.username)
  if(!user){
    const passwordHash = await hash(support.password, 8)
    support.password = passwordHash

    const userSuport = await userRepository.create(support)

    const permissionReporitory = new PermissionRepository()

    const adminPermission = await permissionReporitory.findByName("admin")
    if (adminPermission) {
      const permissions = [adminPermission.id]
      const userId = userSuport.id
      
      const createPermissions = container.resolve(CreateUserAccessControlListUseCase)
      await createPermissions.execute({
        userId, 
        roles: [], 
        permissions
      })
      console.log("[ Usuário de inicialização criado ]")
    }
  }
  console.info("user support already exists")
}


export { createUserSupport }

