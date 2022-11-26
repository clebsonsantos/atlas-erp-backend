import { Base } from "./base";

export type CategoryDTO = Omit<Category, "isValid" | "getValue" | "setIdAndDate">

export class Category extends Base {
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

  setIdAndDate(id: string, createdAt: Date): void {
    this.id = id
    this.created_at = createdAt
    Object.freeze(this)
  }
}