import { AdministratorRepositoryImpl } from '@/infra/database/repositories';

export const makeAdministratorRepository = (): AdministratorRepositoryImpl => {
  return new AdministratorRepositoryImpl()
}