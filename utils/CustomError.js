export class CustomError extends Error {
  constructor(name, status, message) {
    super(message);
    this.name = name;
    this.status = status;
  }
}
