import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity";
import { Column, Entity } from "typeorm";

@Entity("centers_cost")
export class CentersCost extends BaseEntity {
  @Column()
  name: string;
}
