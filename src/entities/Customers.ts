import {
  Column,
  Entity,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
// import { Permission } from "./Permission";
// import { Role } from "./Role";

@Entity("customers")
export class Customers extends BaseEntity {
  @Column()
  full_name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  state_registration: string;

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
