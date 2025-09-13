import { createConnection } from "typeorm";
import { CreateUserSupport, DefaultPermissionsSystem } from "../config";
import { logger } from "@/utils/logger";

createConnection()
  .then(async (data) => {
    logger.info("CONEXÃO EFETUADA COM BANCO DE DADOS");
    logger.info(`Database: ${data.options.database}`);
    const nextAction = await DefaultPermissionsSystem.execute();
    if (nextAction) {
      await CreateUserSupport.execute();
    }
  })
  .catch((err) => {
    logger.error("ERRO AO CONECTAR COM BANCO DE DADOS", err);
  })
  .finally(() => {
    logger.info("Processo de inicialização finalizado");
  });
