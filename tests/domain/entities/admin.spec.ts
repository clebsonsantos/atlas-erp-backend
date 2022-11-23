import { Administrator } from "@/domain/entities";

describe('Administrator', () => {
  let sut: Administrator
  
  beforeEach(() => {
    sut = new Administrator({
      address: {
        bairro: "any",
        cep: "any",
        cidade: "any",
        complemento: "any",
        endereco: "any",
        numero: "any",
        uf: "any"
      },
      contact: {
        email: "any",
        telefone: "any"
      },
      cpf_cnpj: "any",
      fantasia: "any",
      insc_estadual: "any",
      created_at: new Date(),
      id: "any",
      razao: "any",
      url_image: "any"
    })
  })

  it('should be able return valid instance of Administrator', () => {
    expect(sut.isValid()).toBe(true)
  })

  it('should be able return invalid instance of Administrator', () => {
    sut = new Administrator({
      address: {} as any,
      contact: {} as any,
      cpf_cnpj: "",
      fantasia: "",
      insc_estadual: "",
      created_at: new Date(),
      id: "",
      razao: "",
      url_image: ""
    })
    expect(sut.isValid()).toBe(false)
  })
})