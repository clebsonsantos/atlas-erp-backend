import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity" 
import { Column, Entity } from "typeorm" 

@Entity("categories")
export class Category extends BaseEntity {
  @Column()
  name: string 
}
