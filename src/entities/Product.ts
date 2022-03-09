import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { CentersCost } from './CentersCost';

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
