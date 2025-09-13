import { logger } from "@/utils/logger";
import { CustomerRepository } from "../../repositories";

type Type = {
  id: string;
};

export class DeleteCustomerUseCase {
  async execute({ id }: Type) {
    logger.info(`Iniciando processo de exclusão do cliente ${id}`);
    const customer = await CustomerRepository().findOne({ id });

    if (!customer) {
      logger.warn("Cliente não encontrado.");
      return new Error("Cliente não encontrado.");
    }
    let ErrorQuery;
    await CustomerRepository()
      .delete({ id })
      .catch((error) => {
        ErrorQuery = error.message;
      });

    if (ErrorQuery && ErrorQuery.includes("violates foreign key constraint")) {
      const message = `Não é possível deletar o cliente "${customer.full_name}" pois a mesma está vinculada a um ou mais registros.`;
      logger.warn(message);
      return new Error(message);
    }
    return "OK";
  }
}
