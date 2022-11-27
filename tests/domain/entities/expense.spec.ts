import { Expense } from "@/domain/entities";

describe('Expense', () => {
  let sut: Expense
  
  beforeEach(() => {
    sut = new Expense({
      amount: 100,
      category_id: "any-id-category",
      center_cost_id: "any-id-center",
      date: new Date("2022-10-08"),
      description: "any-description",
      frequency: "recurrent",
      quantity: 2,
      type: "entry",
    })
  })

  it('should be able return valid instance of Expense', () => {
    sut.setIdAndDate("any-id", new Date())

    expect(sut.isValid()).toBe(true)
  })

  it('should be able return invalid instance of Expense', () => {
    sut = new Expense({} as any)
    
    expect(sut.isValid()).toBe(false)
  })
})