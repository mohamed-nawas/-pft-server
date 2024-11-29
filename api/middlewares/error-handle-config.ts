import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ErrorResponseWrapper } from "../wrappers/ErrorResponseWrapper";
import { Application, NextFunction, Request, Response } from "express";
import { Logger } from "tslog";

/**
 * Error handling middleware
 */
module.exports = async (app: Application) => {

    const logger = new Logger();

    const PFTException = 'PFTException';
    const InvalidEmailException = 'InvalidEmailException';
    const InvalidPwdException = 'InvalidPwdException';
    const UserExistsException = 'UserExistsException';
    const UserNotFoundException = 'UserNotFoundException';
    const WrongPasswordException = 'WrongPasswordException';

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error("Error occurred, exception => " + err.message);
        if (err.name === PFTException) {
            res.status(ErrorResponseStatusType.INTERNAL_SERVER_ERROR.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.INTERNAL_SERVER_ERROR));
        }
        if (err.name === UserExistsException) {
            res.status(ErrorResponseStatusType.USER_EXISTS.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.USER_EXISTS));
        }
        if (err.name === InvalidEmailException) {
            res.status(ErrorResponseStatusType.INVALID_EMAIL.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.INVALID_EMAIL));
        }
        if (err.name === InvalidPwdException) {
            res.status(ErrorResponseStatusType.INVALID_PWD.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.INVALID_PWD));
        }
        if (err.name === UserNotFoundException) {
            res.status(ErrorResponseStatusType.USER_NOT_FOUND.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.USER_NOT_FOUND));
        }
        if (err.name === WrongPasswordException) {
            res.status(ErrorResponseStatusType.WRONG_PWD.getCode())
            .send(new ErrorResponseWrapper(ErrorResponseStatusType.WRONG_PWD));
        }
    })
}