export class RelationshipError extends Error {
  constructor () {
    super(`Unable to delete record. Check the relationships that depend on it.`)
    this.name = "RelationshipError"
  }
}