import { AdministratorRepositoryImpl } from '@/infra/database/repositories';

export const makeAdministratorRepository = () => {
  return new AdministratorRepositoryImpl()
}