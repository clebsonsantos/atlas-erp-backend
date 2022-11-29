import { Product } from "@/domain/entities";

describe('Product', () => {
  let sut: Product
  
  beforeEach(() => {
    sut = new Product({
      center_cost_id: "any-id-center",
      description: "any-description",
      name: "any-name",
      price_default: 100,
      created_at: new Date(),
      id: "any-id"
    })
  })

  it('should be able return valid instance of Product', () => {
    sut.setIdAndDate("any-id", new Date())

    expect(sut.isValid()).toBe(true)
    expect(sut.getValue().price_default).toBe(100)
  })

  it('should be able return invalid instance of Product', () => {
    sut = new Product({} as any)
    
    expect(sut.isValid()).toBe(false)
    expect(sut.getValue().price_default).toBeUndefined()
  })
})