import Response from '@core/domain/response/Response';

export default interface ResponseRepositoryPort {
    save(response: Response): Promise<void>;
    get(responseId: string): Promise<Response>;
}
