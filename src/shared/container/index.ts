import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository";
import { CustomerRepository } from "@/modules/customers/infra/typeorm/repositories/customer-repository";
import { container } from "tsyringe";

export function startContainer() {
container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
)
}