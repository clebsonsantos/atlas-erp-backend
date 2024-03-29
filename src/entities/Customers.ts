import {
  Column,
  Entity,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("customers")
export class Customers extends BaseEntity {
  @Column()
  full_name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  state_registration: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  address: string;


  @Column()
  zip_code: string;

  
}
