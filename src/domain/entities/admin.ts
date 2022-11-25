import { Base } from "./base"

export type Admin = Omit<Administrator, "isValid" | "getValue" | "id" | "created_at" | "setIdAndDate">

export class Administrator extends Base {
  public razao: string 
  public fantasia: string 
  public cpf_cnpj: string 
  public insc_estadual: string 
  public telefone: string 
  public email: string 
  public endereco: string
  public bairro: string
  public numero: string
  public complemento: string
  public cidade: string
  public uf: string
  public cep: string 
  public url_image: string 

  constructor(params: Admin){
    super()
    Object.assign(this, params)
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

  setIdAndDate(id: string, createdAt: Date): void {
    this.id = id
    this.created_at = createdAt
    Object.freeze(this)
  }
}


