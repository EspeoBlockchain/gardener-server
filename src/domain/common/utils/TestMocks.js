const logger = () => {
  const logs = [];
  return {
    info: log => logs.push(log),
    error: log => logs.push(log),
    list: () => logs,
  };
};


module.exports = {
  logger,
};
