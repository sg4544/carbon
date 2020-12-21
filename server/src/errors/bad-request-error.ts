import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400; //bad request

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  toApiErrors() {
    return [{ message: this.message }];
  }
}
