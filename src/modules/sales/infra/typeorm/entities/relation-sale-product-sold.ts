import { Column, Entity, PrimaryColumn} from "typeorm" 

@Entity("relation_sales_products")
export class RelationsSaleProductsSolds{

  @PrimaryColumn()
  sale_id: string 
  
  @Column()
  products_sold_id: string 

}
