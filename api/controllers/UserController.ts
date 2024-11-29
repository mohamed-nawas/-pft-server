// import { LoginRequestDto } from "@dtos/request/LoginRequestDto";
import { LoginRequestDto } from "../domain/dtos/request/LoginRequestDto";
// import { RegistrationRequestDto } from "@dtos/request/RegistrationRequestDto";
import { RegistrationRequestDto } from "../domain/dtos/request/RegistrationRequestDto";
// import { TokenResponseDto } from "@dtos/response/TokenResponseDto";
import { TokenResponseDto } from "../domain/dtos/response/TokenResponseDto";
// import { ErrorResponseStatusType } from "@enums/ErrorResponseStatusType";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
// import { SuccessResponseStatusType } from "@enums/SuccessResponseStatusType";
import { SuccessResponseStatusType } from "../enums/SuccessResponseStatusType";
// import { UserService } from "@services/UserService";
import { UserService } from "../services/UserService";
// import { ErrorResponseWrapper } from "@wrappers/ErrorResponseWrapper";
import { ErrorResponseWrapper } from "../wrappers/ErrorResponseWrapper";
// import { SuccessResponseWrapper } from "@wrappers/SuccessResponseWrapper";
import { SuccessResponseWrapper } from "../wrappers/SuccessResponseWrapper";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { Logger } from "tslog";

/**
 * User controller
 */
export class UserController {

    private static service: UserService = new UserService();
    private static logger: Logger<unknown> = new Logger();

    public async register(req: Request<{}, {}, RegistrationRequestDto>, res: Response, next: NextFunction): Promise<void> {
        const requestDto = plainToClass(RegistrationRequestDto, req.body);
        if (!requestDto.isRequiredAvailable()) {
            UserController.logger.error("Required fields missing in registration request DTO for registering the user");
            res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
            return;
        }
        try {
            requestDto.validateRequest();
            const token = await UserController.service.createUser(requestDto.getUsername(), requestDto.getEmail(), requestDto.getPwd());
            const responseDto = new TokenResponseDto(token);
            UserController.logger.info("Successfully registered the user, responseDto => ", responseDto.toJson());
            res.status(SuccessResponseStatusType.REGISTER.getCode())
            .send(new SuccessResponseWrapper(SuccessResponseStatusType.REGISTER, responseDto));
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request<{}, {}, LoginRequestDto>, res: Response, next: NextFunction): Promise<void> {
        const requestDto = plainToClass(LoginRequestDto, req.body);
        if (!requestDto.isRequiredAvailable()) {
            UserController.logger.error("Required fields missing in login request DTO for logging the user");
            res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
            return;
        }
        try {
            const token = await UserController.service.login(requestDto.getEmail(), requestDto.getPwd());
            const responseDto = new TokenResponseDto(token);
            UserController.logger.info("Successfully logged in the user, responseDto => ", responseDto.toJson());
            res.status(SuccessResponseStatusType.LOGIN.getCode())
            .send(new SuccessResponseWrapper(SuccessResponseStatusType.LOGIN, responseDto));
        } catch (e) {
            next(e);
        }
    }
}