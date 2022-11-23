import { CPFCNPJValidator } from "@/domain/contracts/gateways/cpf-cnpj-validator";
import { cnpj, cpf } from "cpf-cnpj-validator";

export class Document implements CPFCNPJValidator {
  validate(doc: string): boolean {
    if (doc.length === 14) {
      return cnpj.isValid(doc);
    }
    if (doc.length === 11) {
      return cpf.isValid(doc);
    }
    return false;
  }
}
