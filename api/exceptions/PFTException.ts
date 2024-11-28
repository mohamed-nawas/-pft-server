/**
 * Base exception for Personal Finance Tracker
 */
export class PFTException extends Error {

    private error: Error;
    
    public constructor(message: string, error: Error) {
        super(message);
        this.name = 'PFTException';
        this.error = error;
    }
}