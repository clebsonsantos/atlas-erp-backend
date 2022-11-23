import { BaseEntity } from "@/infra/database/entities/bases" 
import { CentersCost } from "@/infra/database/entities" 
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm" 


@Entity("products")
export class Product extends BaseEntity {
  @Column()
  name: string 

  @Column()
  description: string 

  @Column()
  price_default: number 

  @Column()
  center_cost_id: string 

  @ManyToOne(() => CentersCost)
  @JoinColumn({name: "center_cost_id"})
  center_cost: CentersCost 
}
