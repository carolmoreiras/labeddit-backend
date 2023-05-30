export class AppError extends Error {
  constructor (
    public statusCode: number,
    message = ''
  ) {
    super(message)
  }
}