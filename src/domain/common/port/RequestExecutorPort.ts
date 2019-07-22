import Request from '@core/domain/request/Request';
import Response from '@core/domain/response/Response';

export default interface RequestExecutorPort {
    execute(request: Request): Promise<Response>;
    canHandle(contentType: string): boolean;
}
