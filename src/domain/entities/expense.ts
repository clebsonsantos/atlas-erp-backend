import { Base } from "./base"
import { CategoryDTO } from "./category"
import { CenterCostDTO } from "./center-cost"

export type ExpenseDTO = Omit<Expense, "isValid" | "getValue" | "setIdAndDate">

export class Expense extends Base {
  public center_cost_id: string
  public category_id: string 
  public description: string 
  public quantity: number 
  public amount: number 
  public frequency: string
  public type: string
  public date: Date 
  public center_cost?: CenterCostDTO
  public category?: CategoryDTO

  constructor(params: ExpenseDTO){
    super()
    Object.assign(this, params)
  }

  isValid(): boolean {
    if (
      !this.center_cost_id ||
      !this.category_id ||
      !this.description ||
      !this.quantity ||
      !this.amount ||
      !this.frequency ||
      !this.type ||
      !this.date ||
      !this.id ||
      !this.created_at
    ) {
      return false
    }
    return true
  }

  getValue(): ExpenseDTO {
    return this
  }
}
