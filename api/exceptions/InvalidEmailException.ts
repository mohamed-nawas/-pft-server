/**
 * Invalid email exception
 */
export class InvalidEmailException extends Error {

    public constructor(message: string) {
        super(message);
        this.name = 'InvalidEmailException';
    }
}