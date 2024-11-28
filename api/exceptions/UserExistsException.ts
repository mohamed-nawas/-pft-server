/**
 * User exists exception
 */
export class UserExistsException extends Error {

    public constructor(message: string) {
        super(message);
        this.name = 'UserExistsException';
    }
}