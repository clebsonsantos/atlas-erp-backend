import { CustomerDTO } from "@/domain/entities"
import { AlreadyExists, InvalidFieldError, Failure } from "@/domain/errors"
import { Either } from "@/shared/either"

type Invalid = InvalidFieldError | AlreadyExists | Failure

export interface CreateCustomer {
  execute: (params: CreateCustomer.Input) => Promise<CreateCustomer.Output>
}
export namespace CreateCustomer {
  export type Input = Omit<CustomerDTO, "id" | "created_at">
  export type Output = Either<Invalid, CustomerDTO>
}


export interface DeleteCustomer {
  execute: (params: DeleteCustomer.Input) => Promise<DeleteCustomer.Output>
}
export namespace DeleteCustomer {
  export type Input = {
    id: string
  }
  export type Output = Either<Invalid, String>
}

export interface FindAllCustomerOrFilter {
  execute: (params: FindAllCustomerOrFilter.Input) => Promise<FindAllCustomerOrFilter.Output>
}
export namespace FindAllCustomerOrFilter {
  export type Input = {
    id?: string 
    full_name?: string
  }
  export type Output =  CustomerDTO[] | CustomerDTO
}

export interface UpdateCustomer {
  execute: (params: UpdateCustomer.Input) => Promise<UpdateCustomer.Output>
}
export namespace UpdateCustomer {
  export type Input = Omit<CustomerDTO, "created_at">
  export type Output = Either<Invalid, CustomerDTO>
}