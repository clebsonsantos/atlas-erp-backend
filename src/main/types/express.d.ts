
declare module Express {
  interface Request {
    locals?: any
    userId: string
  }
}
