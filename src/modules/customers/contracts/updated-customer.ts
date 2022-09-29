import { Either } from "@/shared/either";
import { Customer } from "../infra/typeorm/entities/customer";

export namespace UpdateCustomer {
  export type Params = {
    id: string
    full_name: string;
    cpf_cnpj: string;
    state_registration: number;
    phone: string;
    email: string;
    state: string;
    city: string;
    address: string;
    zip_code: string
  }
  export type Result = Either<Error, Customer>
}