// ENTIDADE PARA REGISTRO DE DESPESAS
import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { BaseExpenses } from './BaseExpenses';
import { Category } from './Category';
import { CentersCost } from './CentersCost';

@Entity("expenses")
export class Expenses extends BaseExpenses {

  @Column()
  center_cost_id: string

  @ManyToOne(() => CentersCost)
  @JoinTable({
    name: "centers_cost",
    joinColumns: [{ name: "center_cost_id" }],
  })
  center_cost: CentersCost;
  

  @Column()
  category_id: string

  @ManyToOne(() => Category)
  @JoinTable({
    name: "categories",
    joinColumns: [{ name: "category_id" }],
  })
  category: Category;



}
