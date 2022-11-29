import { Base } from "@/domain/entities";

export type AdminDTO = Omit<Administrator, "isValid" | "getValue" | "id" | "created_at" | "setIdAndDate">

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

  constructor(params: AdminDTO){
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

  public getValue(): AdminDTO {
    return this
  }
}


