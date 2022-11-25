import { Administrator } from "@/domain/entities";

describe('Administrator', () => {
  let sut: Administrator
  
  beforeEach(() => {
    sut = new Administrator({
      cep: "any",
      cidade: "any",
      complemento: "any",
      endereco: "any",
      bairro: "any",
      numero: "any",
      uf: "any",
      email: "any",
      telefone: "any",
      cpf_cnpj: "any",
      fantasia: "any",
      insc_estadual: "any",
      razao: "any",
      url_image: "any"
    })
  })

  it('should be able return valid instance of Administrator', () => {
    sut.setIdAndDate("any-id", new Date())

    expect(sut.isValid()).toBe(true)
  })

  it('should be able return invalid instance of Administrator', () => {
    sut = new Administrator({
      cep: "",
      cidade: "",
      complemento: "",
      endereco: "",
      bairro: "",
      numero: "",
      uf: "",
      email: "",
      telefone: "",
      cpf_cnpj: "",
      fantasia: "",
      insc_estadual: "",
      razao: "",
      url_image: ""
    })
    expect(sut.isValid()).toBe(false)
  })
})