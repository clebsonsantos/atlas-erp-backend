import { CentersCost } from "@/modules/centercost/infra/typeorm/entities/center-cost";
import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";


@Entity("products")
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price_default: number;

  @Column()
  center_cost_id: string;

  @ManyToOne(() => CentersCost)
  @JoinColumn({name: "center_cost_id"})
  center_cost: CentersCost;
}
