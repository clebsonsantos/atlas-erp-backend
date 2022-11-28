import { Customer } from "@/domain/entities";

describe('Customer', () => {
  let sut: Customer
  
  beforeEach(() => {
    sut = new Customer({
      address: "empty",
      city: "empty",
      cpf_cnpj: "empty",
      email: "clebsnsantos@gmail.com",
      state: "empty",
      full_name: "empty",
      phone: "empty",
      state_registration: 12121,
      zip_code: "empty",
    })
  })

  it('should be able return valid instance of Customer', () => {
    sut.setIdAndDate("any-id", new Date())

    expect(sut.isValid()).toBe(true)
    expect(sut.getValue().full_name).toBe("empty")
  })

  it('should be able return invalid instance of Customer', () => {
    sut = new Customer({ } as any)
    
    expect(sut.isValid()).toBe(false)
  })
})