class CreateRequestEvent {

  static name() {
    return 'CreateRequestEvent';
  }
  
  constructor(id, url, validFrom) {
    this.id = id;
    this.url = url;
    this.validFrom = validFrom;
  }
}

module.exports = CreateRequestEvent;