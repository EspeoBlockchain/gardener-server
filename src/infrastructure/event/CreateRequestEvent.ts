class CreateRequestEvent {

  // @ts-ignore
  static name() {
    return 'CreateRequestEvent';
  }
  id: any;
  url: any;
  validFrom: any;

  constructor(id, url, validFrom) {
    this.id = id;
    this.url = url;
    this.validFrom = validFrom;
  }
}

export default CreateRequestEvent;
