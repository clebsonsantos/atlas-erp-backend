import { BaseEntity } from "@/infra/database/entities/bases"
import { Column, Entity } from "typeorm" 

@Entity("permissions")
export class Permission extends BaseEntity {
  @Column()
  name: string 

  @Column()
  description: string 
}
