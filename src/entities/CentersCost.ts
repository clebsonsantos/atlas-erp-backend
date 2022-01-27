import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("centers_cost")
export class CentersCost extends BaseEntity {
  @Column()
  name: string;
}
