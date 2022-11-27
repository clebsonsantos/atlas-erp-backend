import { Base } from "./base"

export type ExpenseDTO = Omit<Expense, "isValid" | "getValue" | "setIdAndDate">

export class Expense extends Base {
  public center_cost_id: string
  public category_id: string 
  public description: string 
  public quantity: number 
  public amount: number 
  public frequency: "recurrent" | "eventual" 
  public type: "entry" | "output"
  public date: Date 

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

  getValue(): this {
    return this
  }
}
