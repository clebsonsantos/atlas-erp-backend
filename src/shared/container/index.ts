import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository";
import { CustomerRepository } from "@/modules/customers/infra/typeorm/repositories/customer-repository";
import { container } from "tsyringe";
import { IUserRepository } from "@/modules/user/repositories/iuser-reposiotry";
import { UserRepository } from "@/modules/user/infra/typeorm/repositories/user-repository";

export function startContainer() {
  container.registerSingleton<ICustomerRepository>(
    "CustomerRepository",
    CustomerRepository
  )
  container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
  )
}