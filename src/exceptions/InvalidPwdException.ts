/**
 * Invalid pwd exception
 */
export class InvalidPwdException extends Error {

    public constructor(message: string) {
        super(message);
        this.name = 'InvalidPwdException';
    }
}