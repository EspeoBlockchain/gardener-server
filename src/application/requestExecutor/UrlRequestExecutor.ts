import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';

class UrlRequestExecutor implements RequestExecutor {
    execute(request: Request) {
        throw new Error('Method not implemented.');
    }
}

export default UrlRequestExecutor;
