import { Customer } from "../infra/typeorm/entities/customer" 

export namespace FindAllCustomerOrFilter {
  export type Input = {
    id?: string 
    full_name?: string
  }
  export type Output =  Customer[] | Customer
}