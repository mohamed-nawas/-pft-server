/**
 * Base class for generalizing response statuses
 */
export class ResponseStatusType {
    
    private status: string;
    private message: string;
    private code: number;

    protected constructor(status: string, message: string, code: number) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public getStatus(): string { return this.status; }

    public getMessage(): string { return this.message; }
    
    public getCode(): number { return this.code; }
}