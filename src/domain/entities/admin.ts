import { Base } from "./base"

export type Admin = Omit<Administrator, "isValid" | "getValue">

export class Administrator extends Base {
  private razao: string 
  private fantasia: string 
  private cpf_cnpj: string 
  private insc_estadual: string 
  private telefone: string 
  private email: string 
  private endereco: string
  private bairro: string
  private numero: string
  private complemento: string
  private cidade: string
  private uf: string
  private cep: string 
  private url_image: string 

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
      !this.telefone ||
      !this.email ||
      !this.endereco ||
      !this.bairro ||
      !this.numero ||
      !this.complemento ||
      !this.cidade ||
      !this.uf ||
      !this.cep
    ) {
      return false
    }
    return true
  }

  public getValue(): Omit<this, "isValid" | "getValue"> {
    return this
  }
}


