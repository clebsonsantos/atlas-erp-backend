import { Document } from "@/infra/gateways/cpf-cnpj";

export const makeDocumentValidator = (): Document => {
  return new Document()
}