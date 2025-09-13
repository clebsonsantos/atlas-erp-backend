import { logger } from "@/utils/logger";
import { UserRepository } from "../../repositories";

type DeleteType = {
  id: string;
};

export class DeleteUserUseCase {
  async execute({ id }: DeleteType) {
    logger.info(`Iniciando remoção do usuário ${id}`);
    const user = await UserRepository().findOne({ id });
    let QueryFailedError;
    if (!user) {
      logger.warn("Usuário não encontrado.");
      return new Error("Usuário não encontrado.");
    }

    await UserRepository()
      .delete({ id })
      .catch((err) => {
        QueryFailedError = err.message;
      });

    if (
      QueryFailedError &&
      QueryFailedError.includes("violates foreign key constraint")
    ) {
      const message = `Não é possível deletar esse registro.\nExistem relacionamentos que dependem dele.`;
      logger.error(message);
      return new Error(message);
    }
    logger.info(`Usuário ${id} deletado com sucesso.`);
    return "Usuário deletado com sucesso!";
  }
}
