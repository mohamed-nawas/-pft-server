import { ResponseStatusType } from "./ResponseStatusType";

/**
 * Generic class for error response statuses
 */
export class SuccessResponseStatusType extends ResponseStatusType {
    static readonly LOGIN = new SuccessResponseStatusType("Successfully logged in the user", 200);
    static readonly REGISTER = new SuccessResponseStatusType("Successfully registered the user", 201);

    private constructor(message: string, code: number) {
        super("SUCCESS", message, code);
    }
}