// ENTIDADE BASE AS DESPESAS
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, PrimaryColumn} from "typeorm";

export class BaseExpenses {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @Column()
  frequency: string;

  @Column()
  type: string;

  @CreateDateColumn()
  date: Date;


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}
