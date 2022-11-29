import { CenterCost, Base } from "@/domain/entities" 

type ProductDTO =  Omit<Product, "isValid" | "getValue" | "setIdAndDate">

export class Product extends Base {
  public name: string 
  public description: string 
  public price_default: number 
  public center_cost_id: string 
  public center_cost?: CenterCost 

  constructor(params: ProductDTO){
    super()
    Object.assign(this, params)
  }

  isValid(): boolean {
    if (
      !this.center_cost_id ||
      !this.description ||
      !this.name ||
      !this.price_default ||
      !this.id ||
      !this.created_at
    ) {
      return false
    }
    return true
  }

  getValue(): ProductDTO {
    return this
  }
}
