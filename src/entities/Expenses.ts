// ENTIDADE PARA REGISTRO DE DESPESAS
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { BaseExpenses } from './BaseExpenses';
import { Category } from './Category';
import { CentersCost } from './CentersCost';

@Entity("expenses")
export class Expenses extends BaseExpenses {

  @Column()
  center_cost_id: string;

  @ManyToOne(() => CentersCost)
  @JoinColumn({name: "center_cost_id"})
  center_cost: CentersCost;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({name: "category_id"})
  category: Category;



}
