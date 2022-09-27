import { Administrator } from '../../entities/Administrator';
import { AdministratorRepository } from '../../repositories';

type AdministratorTypes = {
  razao: string;
  fantasia?: string;
  cpf_cnpj: number;
  insc_estadual: number;
  endereco: string;
  bairro: string;
  numero: string;
  complemento: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  url_image?: string;
}


export class CreateAdministratorUseCase  {

  async execute({
    razao,
    fantasia,
    cpf_cnpj,
    insc_estadual,
    endereco,
    bairro,
    numero,
    complemento,
    cidade,
    uf,
    cep,
    telefone,
    email,
    url_image }: AdministratorTypes): Promise< Administrator | Error>  {

    const administrator = AdministratorRepository().create({
    razao,
    fantasia,
    cpf_cnpj,
    insc_estadual,
    endereco,
    bairro,
    numero,
    complemento,
    cidade,
    uf,
    cep,
    telefone,
    email,
    url_image
    })
    const admin = await AdministratorRepository().find()
    
    if(admin.length == 1){
      return new Error("Só é possivel que haja uma empresa administradora cadastrada.")
    }

    await AdministratorRepository().save(administrator)

    return administrator
    
  }
}
