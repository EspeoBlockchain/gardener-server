class InvalidRequestError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
    code(code: any) {
        throw new Error('Method not implemented.');
    }
}

export default InvalidRequestError;
