const responseBody = {
  status: 'down',
};

const statusEndpoint = (app, checkHealthStatusUseCase) => {
  app.get('/status', (req, res) => {
    const { server } = checkHealthStatusUseCase.checkHeathStatus();

    if (server) {
      responseBody.status = 'alive';
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.send(responseBody);
  });
};

module.exports = statusEndpoint;
