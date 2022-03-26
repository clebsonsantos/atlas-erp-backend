import { User } from '../../entities/User';


export class UsersReports  {

  async execute( Users: User[]): Promise< any | Error> {
    //TODO: AO RECEBER A LISTA DE USUARIOS É PRECISO RETORNAR UM BUFFE QUE SERÁ RENDERIZADO EM TELA, CONTENTO O RELATORIO PDF DE USUARIOS

  return Users    
  }
}
