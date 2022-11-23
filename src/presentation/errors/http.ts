export class ServerError extends Error {
  constructor (error?: Error) {
    super("Server failed. Try again soon.")
    this.name = "ServerError"
    this.stack = error?.stack
  }
}

export class UnauthorazedError extends Error {
  constructor () {
    super(`Unauthorazed`)
    this.name = "UnauthorazedError"
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super(`Access denied`)
    this.name = "ForbiddenError"
  }
}
