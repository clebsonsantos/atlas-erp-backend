import { BaseEntity } from "@/infra/database/entities/bases" 
import { Column, Entity,  } from "typeorm" 

@Entity("administrator")
export class Administrator extends BaseEntity {

  @Column()
  razao: string 

  @Column()
  fantasia: string 

  @Column()
  cpf_cnpj: string 

  @Column()
  insc_estadual: string 

  @Column()
  endereco: string 

  @Column()
  bairro: string 

  @Column()
  numero: string 

  @Column()
  complemento: string 

  @Column()
  cidade: string 

  @Column()
  uf: string 

  @Column()
  cep: string 

  @Column()
  telefone: string 

  @Column()
  email: string 

  @Column()
  url_image: string 
}
