export class AlreadyExists extends Error {
  constructor (entity: string) {
    super(`${entity} already exists`)
    this.name = "AlreadyExists"
  }
}