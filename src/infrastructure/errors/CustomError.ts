export default class CustomAPIError extends Error {
  constructor(
    message: string,
    private statusCode: number
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
