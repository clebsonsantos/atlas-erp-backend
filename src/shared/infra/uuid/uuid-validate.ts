import { validate } from "uuid";

export class UuidValidate {
  
  validateUuid(uuid: string): boolean {
    const isValid = validate(uuid)
    return isValid
  }
}