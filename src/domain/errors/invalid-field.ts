export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is invalid`)
    this.name = "InvalidFieldError"
  }
}