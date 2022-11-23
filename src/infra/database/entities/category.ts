import { BaseEntity } from "@/infra/database/entities/bases"
import { Column, Entity } from "typeorm" 

@Entity("categories")
export class Category extends BaseEntity {
  @Column()
  name: string 
}
