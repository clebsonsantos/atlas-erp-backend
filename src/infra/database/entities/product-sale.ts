import { BaseEntity } from "@/infra/database/entities/bases"
import { Product } from "@/infra/database/entities"
import { Column, Entity, JoinColumn, OneToOne } from "typeorm" 


@Entity("products_solds")
export class ProductSales extends BaseEntity {

  @Column()
  id_product: string 

  @OneToOne(() => Product)
  @JoinColumn({name: "id_product"})
  product: Product 
  
  @Column()
  quantity: number 
  
  @Column()
  price_unit: number 
  
  @Column()
  total_price: number 

}
