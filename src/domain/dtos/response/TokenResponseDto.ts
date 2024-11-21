import { ResponseDto } from "./ResponseDto";

/**
 * Token response dto
 */
export class TokenResponseDto extends ResponseDto {
    
    private token: string;

    public constructor(token: string) {
        super();
        this.token = token;
    }
}