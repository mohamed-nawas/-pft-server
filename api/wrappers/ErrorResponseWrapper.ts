import { ErrorResponseStatusType } from "@enums/ErrorResponseStatusType";
import { ResponseWrapper } from "./ResponseWrapper";

/**
 * Generic class for error responses
 */
export class ErrorResponseWrapper extends ResponseWrapper {

    private errorCode: number;

    public constructor(status: ErrorResponseStatusType) {
        super(status.getStatus(), status.getMessage());
        this.errorCode = status.getCode();
    }

    public getCode(): number {
        return this.errorCode;
    }
}