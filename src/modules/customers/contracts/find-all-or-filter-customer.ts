import { Customer } from "../infra/typeorm/entities/customer" 

export namespace FindAllCustomerOrFilter {
  export type Params = {
    id?: string 
    full_name?: string
  }
  export type Result =  Customer[] | Customer
}