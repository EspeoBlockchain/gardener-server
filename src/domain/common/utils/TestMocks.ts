class Logger {
  constructor() {
    this.logs = [];
  }

  info(log) {
    this.logs.push(log);
  }

  error(log) {
    this.logs.push(log);
  }

  list() {
    return this.logs;
  }
}


class Repository {
  constructor() {
    this.collection = new Map();
  }

  save(req) {
    this.collection.set(req.id, req);
  }

  list() {
    return Array.from(this.collection.values());
  }

  exists(id) {
    return this.collection.has(id);
  }
}

export default {
  Logger,
  Repository,
};
