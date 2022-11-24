import { Document } from "@/infra/gateways";

export const makeDocumentValidator = (): Document => {
  return new Document()
}