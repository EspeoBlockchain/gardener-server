class CreateRequestEvent {
  id: any;
  url: any;
  validFrom: any;

  // @ts-ignore
  static name() {
    return 'CreateRequestEvent';
  }

  constructor(id, url, validFrom) {
    this.id = id;
    this.url = url;
    this.validFrom = validFrom;
  }
}

export default CreateRequestEvent;
