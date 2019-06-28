class CreateRequestEvent {

  // @ts-ignore
  static name() {
    return 'CreateRequestEvent';
  }

  constructor(public id: string, public url: string, public validFrom: number | Date) {
  }
}

export default CreateRequestEvent;
