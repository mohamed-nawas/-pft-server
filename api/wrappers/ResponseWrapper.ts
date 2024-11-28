/**
 * Base class for generalizing responses
 */
export abstract class ResponseWrapper {

    private status: string;
    private message: string;

    protected constructor(status: string, message: string) {
        this.status = status;
        this.message = message;
    }

    public getStatus(): string { return this.status; }

    public getMessage(): string { return this.message; }

    protected abstract getCode(): number;
}