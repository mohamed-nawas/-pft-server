import { SuccessResponseStatusType } from "@enums/SuccessResponseStatusType";
import { ResponseWrapper } from "@wrappers/ResponseWrapper";
import { ResponseDto } from "@dtos/response/ResponseDto";

/**
 * Generic class for success responses
 */
export class SuccessResponseWrapper extends ResponseWrapper {

    private data: ResponseDto;
    private statusCode: number;

    public constructor(status: SuccessResponseStatusType, data: ResponseDto) {
        super(status.getStatus(), status.getMessage());
        this.data = data;
        this.statusCode = status.getCode();
    }

    public getData(): ResponseDto {
        return this.data;
    }

    public getCode(): number {
        return this.statusCode;
    }
}