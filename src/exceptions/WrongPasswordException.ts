/**
 * Wrong password exception
 */
export class WrongPasswordException extends Error {

    public constructor(message: string) {
        super(message);
        this.name = 'WrongPasswordException';
    }
}