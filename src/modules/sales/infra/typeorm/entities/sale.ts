import { Customer } from "@/infra/database/entities" 
import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity" 
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm" 
import { ProductSales } from "./product-sale" 


@Entity("sales")
export class Sales extends BaseEntity {

  @Column()
  date: Date 

  @Column()
  customer_id: string 

  @Column()
  salesman: string 

  @ManyToOne(() => Customer)
  @JoinColumn({name: "customer_id"})
  customer: Customer 

  @Column()
  sale_number: number 

  @ManyToMany(() => ProductSales)
  @JoinTable({
    name: "relation_sales_products",
    joinColumns: [{ name: "sale_id" }],
    inverseJoinColumns: [{ name: "products_sold_id" }],
  })
  products_sold: ProductSales[] 


}
