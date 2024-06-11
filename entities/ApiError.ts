export class ApiError extends Error {
  status: number = 200;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  result() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
