import { Base } from "./base";

export type CenterCostDTO = Omit<CenterCost, "isValid" | "getValue" | "setIdAndDate">

export class CenterCost extends Base {
  constructor(
    public name: string
  ){
    super()
  }
  
  isValid(): boolean {
    if (
      !this.name ||
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