import { ResponseStatusType } from "./ResponseStatusType";

/**
 * Generic class for error response statuses
 */
export class ErrorResponseStatusType extends ResponseStatusType {
    static readonly MISSING_REQUIRED_FIELDS = new ErrorResponseStatusType("Missing required fields", 400);
    static readonly USER_EXISTS = new ErrorResponseStatusType("User already exists", 400);
    static readonly INVALID_EMAIL = new ErrorResponseStatusType("Given email is not in a valid format", 400);
    static readonly INVALID_PWD = new ErrorResponseStatusType("Password should contain atleast 10 characters", 400);
    static readonly WRONG_PWD = new ErrorResponseStatusType("Password is wrong for the given account", 400);
    static readonly UNAUTHORIZED = new ErrorResponseStatusType("Unauthorized", 401);
    static readonly USER_NOT_FOUND = new ErrorResponseStatusType("User not found", 404);
    static readonly INTERNAL_SERVER_ERROR = new ErrorResponseStatusType("Internal server error", 500);

    private constructor(message: string, code: number) {
        super("ERROR", message, code);
    }
}