import { Administrator } from '../../entities/Administrator';
import { AdministratorRepository } from '../../repositories';


export class GetAdministratorUseCase  {

  async execute(): Promise<Administrator[]>{

    const administrator = await AdministratorRepository().find()

    return administrator
    
  }
}
