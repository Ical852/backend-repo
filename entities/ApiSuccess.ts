export class ApiSuccess {
  status: number = 200;
  message: string;
  data: any;

  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  get() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}
