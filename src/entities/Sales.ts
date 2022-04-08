import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Generated } from "typeorm";
import { BaseEntity } from './BaseEntity';
import { Customers } from './Customers';
import { ProductSales } from './ProductSales';

@Entity("sales")
export class Sales extends BaseEntity {

  @Column()
  date: Date;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({name: "customer_id"})
  customer: Customers;

  @Column()
  sale_number: number;

  @ManyToMany(() => ProductSales)
  @JoinTable({
    name: "relation_sales_products",
    joinColumns: [{ name: "sale_id" }],
    inverseJoinColumns: [{ name: "products_sold_id" }],
  })
  products_sold: ProductSales[];


}
