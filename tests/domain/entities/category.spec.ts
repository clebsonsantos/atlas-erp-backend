import { Category } from "@/domain/entities";

describe('Category', () => {
  let sut: Category
  
  beforeEach(() => {
    sut = new Category("any-category")
  })

  it('should be able return valid instance of Category', () => {
    sut.setIdAndDate("any-id", new Date())

    expect(sut.isValid()).toBe(true)
  })

  it('should be able return invalid instance of Category', () => {
    sut = new Category("")
    
    expect(sut.isValid()).toBe(false)
  })
})