import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity";
import { Column, Entity,  } from "typeorm";

@Entity("administrator")
export class Administrator extends BaseEntity {

  @Column()
  razao: string;

  @Column()
  fantasia: string;

  @Column()
  cpf_cnpj: number;

  @Column()
  insc_estadual: number;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @Column()
  cep: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  url_image: string;
}
