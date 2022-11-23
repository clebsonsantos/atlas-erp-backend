import { Base } from "./base"

type Address = {
  endereco: string
  bairro: string
  numero: string
  complemento: string
  cidade: string
  uf: string
  cep: string 
}

type Contact = {
  telefone: string 
  email: string 
}

export type Admin = Omit<Administrator, "isValid" | "getValue">

export class Administrator extends Base {
  public razao: string 
  public fantasia: string 
  public cpf_cnpj: string 
  public insc_estadual: string 
  public address: Address
  public contact: Contact
  public url_image: string 

  constructor(params: Admin){
    super()
    Object.assign(this, params)
    Object.freeze(this)
  }

  public isValid(): boolean {
    if (
      !this.id || 
      !this.fantasia || 
      !this.cpf_cnpj || 
      !this.insc_estadual || 
      !this.razao || 
      !this.created_at || 
      !this.url_image ||
      !Object.values(this.contact).length || 
      !Object.values(this.address).length
    ) {
      return false
    }
    return true
  }

  public getValue(): Omit<this, "isValid" | "getValue"> {
    return this
  }
}


