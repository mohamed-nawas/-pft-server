/**
 * User not found exception
 */
export class UserNotFoundException extends Error {

    public constructor(message: string) {
        super(message);
        this.name = 'UserNotFoundException';
    }
}