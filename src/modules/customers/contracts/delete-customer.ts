import { Either } from "@/shared/either"

export namespace DeleteCustomer {
  export type Params = {
    id: string
  }
  export type Result = Either<Error, String>
}