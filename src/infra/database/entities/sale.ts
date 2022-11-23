import { BaseEntity } from "@/infra/database/entities/bases"
import { Customer, ProductSales } from "@/infra/database/entities"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm" 


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
