import { AdministratorRepository } from '../../repositories';
import { Administrator } from "./infra/typeorm/entities/adminitrator";


export class GetAdministratorUseCase  {

  async execute(): Promise<Administrator[]>{

    const administrator = await AdministratorRepository().find()

    return administrator
    
  } 
}
