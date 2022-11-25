export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} token is required`)
    this.name = "RequiredFieldError"
  }
}