import { AdministratorRepository } from '../../repositories';

type AdministratorTypes = {
  id: string;
  razao?: string;
  fantasia?: string;
  cpf_cnpj?: number;
  insc_estadual?: number;
  endereco?: string;
  bairro?: string;
  numero?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  url_image?: string;
}


export class UpdateAdministratorUseCase  {

  async execute({
    id,
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
    telefone,
    email,
    url_image
   }: AdministratorTypes){
    const administrator = await AdministratorRepository().findOne({id})

    if(!administrator){
      return new Error("Administrador não existe.");
    }

    administrator.razao = razao ? razao : administrator.razao
    administrator.fantasia = fantasia ? fantasia : administrator.fantasia
    administrator.cpf_cnpj = cpf_cnpj ? cpf_cnpj : administrator.cpf_cnpj
    administrator.insc_estadual = insc_estadual ? insc_estadual : administrator.insc_estadual
    administrator.endereco = endereco ? endereco : administrator.endereco
    administrator.bairro = bairro ? bairro : administrator.bairro
    administrator.numero = numero ? numero : administrator.numero
    administrator.complemento = complemento ? complemento : administrator.complemento
    administrator.cidade = cidade ? cidade : administrator.cidade
    administrator.uf = uf ? uf : administrator.uf
    administrator.telefone = telefone ? telefone : administrator.telefone
    administrator.email = email ? email : administrator.email
    administrator.url_image = url_image ? url_image : administrator.url_image

    AdministratorRepository().save(administrator)

    return administrator


    
  }
}
