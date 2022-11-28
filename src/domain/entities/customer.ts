import { Base } from "@/domain/entities"

export type CustomerDTO = Omit<Customer, "isValid" | "getValue" | "setIdAndDate">

export class Customer extends Base {
  public full_name: string 
  public cpf_cnpj: string 
  public state_registration: number 
  public phone: string 
  public email: string 
  public state: string 
  public city: string 
  public address: string 
  public zip_code: string 

  constructor(params: CustomerDTO){
    super()
    Object.assign(this, params)
  }
  
  isValid(): boolean {
    if (
      !this.full_name ||
      !this.cpf_cnpj ||
      !this.state_registration ||
      !this.phone ||
      !this.email ||
      !this.state ||
      !this.city ||
      !this.address ||
      !this.zip_code ||
      !this.id ||
      !this.created_at
    ) {
      return false
    }
    return true
  }

  getValue(): CustomerDTO {
    return this
  }
}
