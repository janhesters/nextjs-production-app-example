import { CustomError } from 'ts-custom-error';

class HttpError extends CustomError {
  public constructor(public code: number, message?: string) {
    super(message);
    Object.defineProperty(this, 'name', { value: 'HttpError' });
  }
}

export { HttpError };
