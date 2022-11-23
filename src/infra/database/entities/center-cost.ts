import { BaseEntity } from "@/infra/database/entities/bases"
import { Column, Entity } from "typeorm"

@Entity("centers_cost")
export class CentersCost extends BaseEntity {
  @Column()
  name: string
}
