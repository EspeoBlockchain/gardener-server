const responseBody = {
  status: 'down',
};

const statusEndpoint = (app: any, checkHealthStatusUseCase: any) => {
  app.get('/status', (_: any, res: any) => {
    const { isAlive } = checkHealthStatusUseCase.checkStatus();

    if (isAlive) {
      responseBody.status = 'alive';
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.send(responseBody);
  });
};

export default statusEndpoint;
