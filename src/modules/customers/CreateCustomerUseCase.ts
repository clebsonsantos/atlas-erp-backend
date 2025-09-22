import { cnpj, cpf } from "cpf-cnpj-validator";
import { Customers } from "../../infrastructure/persistence/entities/Customers";
import { CustomerRepository } from "../../repositories";
import { logger } from "@/utils/logger";
import { log } from "winston";

type ICustomers = {
  full_name: string;
  cpf_cnpj: string;
  state_registration: number;
  phone: string;
  email: string;
  state: string;
  city: string;
  address: string;
  zip_code: string;
};

export class CreateCustomerUseCase {
  async execute({
    full_name,
    cpf_cnpj,
    state_registration,
    phone,
    email,
    state,
    city,
    address,
    zip_code,
  }: ICustomers): Promise<Customers | Error> {
    logger.info("Criando novo cliente");
    const customer = CustomerRepository().create({
      full_name,
      cpf_cnpj,
      state_registration,
      phone,
      email,
      state,
      city,
      address,
      zip_code,
    });
    if (!full_name || !phone) {
      logger.warn("Nome completo e telefone são campos obrigatórios.");
      return new Error("Nome completo e telefone são campos obrigatórios.");
    }
    if (cpf_cnpj.length > 1) {
      logger.info("Validando CPF/CNPJ");
      const isValid = cpf.isValid(cpf_cnpj)
        ? cpf.isValid(cpf_cnpj)
        : cnpj.isValid(cpf_cnpj);
      if (isValid) {
        logger.info("CPF/CNPJ válido.");
        if (await CustomerRepository().findOne({ cpf_cnpj: cpf_cnpj })) {
          logger.warn("Este Cliente já existe.");
          return new Error("Este Cliente já existe.");
        }
      } else {
        logger.warn("Insira um cpf/cnpj válido.");
        return new Error("Insira um cpf/cnpj válido.");
      }
    }
    await CustomerRepository().save(customer);
    logger.info(`Cliente criado:` + customer.full_name);
    return customer;
  }
}
