const logger = () => {
  const logs = [];
  return {
    info: log => logs.push(log),
    error: log => logs.push(log),
    list: () => logs,
  };
};

const repository = () => {
  const collection = new Map();
  return {
    save: req => collection.set(req.id, req),
    list: () => Array.from(collection.values()),
    exists: id => collection.has(id),
  };
};


module.exports = {
  logger,
  repository,
};
