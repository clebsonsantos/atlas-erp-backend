import { Product } from "@/modules/products/infra/typeorm/entities/product";
import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";


@Entity("products_solds")
export class ProductSales extends BaseEntity {

  @Column()
  id_product: string;

  @OneToOne(() => Product)
  @JoinColumn({name: "id_product"})
  product: Product;
  
  @Column()
  quantity: number;
  
  @Column()
  price_unit: number;
  
  @Column()
  total_price: number;

}
