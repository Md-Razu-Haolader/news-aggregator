import { HttpError } from 'routing-controllers';

export default class ValidationError extends HttpError {
  protected errors: Record<string, string[]> = {};

  constructor(fieldName: string, errorMessage: string) {
    super(422, errorMessage);
    Object.setPrototypeOf(this, ValidationError.prototype);

    if (fieldName) {
      this.errors = { [fieldName]: [errorMessage] };
    }
  }

  static withErrors(errors: Record<string, string[]>) {
    const err = new ValidationError('', '');
    err.setErrors(errors);
    return err;
  }

  setErrors(errors: Record<string, string[]>) {
    this.errors = errors;
  }

  toJSON() {
    return {
      message: 'The given data is invalid.',
      errors: this.errors,
    };
  }
}
