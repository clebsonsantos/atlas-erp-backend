import { Category } from "@/infra/database/entities" 
import { CentersCost } from "@/infra/database/entities" 
import { BaseExpenses } from "@/shared/infra/typeorm/bases/base-expense-entity" 
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm" 


@Entity("expenses")
export class Expenses extends BaseExpenses {

  @Column()
  center_cost_id: string 

  @ManyToOne(() => CentersCost)
  @JoinColumn({name: "center_cost_id"})
  center_cost: CentersCost 

  @Column()
  category_id: string 

  @ManyToOne(() => Category)
  @JoinColumn({name: "category_id"})
  category: Category 

}
