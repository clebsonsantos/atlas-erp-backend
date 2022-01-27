// ENTIDADE PARA REGISTRO DE DESPESAS
import { Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseExpenses } from './BaseExpenses';
import { Category } from './Category';
import { CentersCost } from './CentersCost';

@Entity("expenses")
export class Expenses extends BaseExpenses {

  @ManyToMany(() => CentersCost)
  @JoinTable({
    name: "centers_cost",
    joinColumns: [{ name: "id" }],
  })
  center_cost_id: CentersCost[];


  @ManyToMany(() => Category)
  @JoinTable({
    name: "categories",
    joinColumns: [{ name: "id" }],
  })
  category_id: Category[];


}
