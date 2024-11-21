/**
 * Base class for responses, all responses should inhertit this base class
 */
export class ResponseDto {

    public toJson(): string {
        return JSON.stringify(this);
    }
}