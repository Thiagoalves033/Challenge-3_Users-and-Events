export default class CustomAPIError extends Error {
  statusCode: number;
  message: string;
  type: string;

  constructor(message: string, type: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
  }
}
