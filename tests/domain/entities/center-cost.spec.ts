import { CenterCost } from "@/domain/entities";

describe('CenterCost', () => {
  let sut: CenterCost
  
  beforeEach(() => {
    sut = new CenterCost("any-center")
  })

  it('should be able return valid instance of CenterCost', () => {
    sut.setIdAndDate("any-id", new Date())

    expect(sut.isValid()).toBe(true)
  })

  it('should be able return invalid instance of CenterCost', () => {
    sut = new CenterCost("")
    
    expect(sut.isValid()).toBe(false)
  })
})