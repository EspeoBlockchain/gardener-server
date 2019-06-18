class InvalidRequestError extends Error {
    code(code: any) {
        throw new Error("Method not implemented.");
    }
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export default InvalidRequestError;
