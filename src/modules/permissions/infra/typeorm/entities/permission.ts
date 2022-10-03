import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity";
import { Column, Entity } from "typeorm";

@Entity("permissions")
export class Permission extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
