import { RequestDto } from "@dtos/request/RequestDto";
import { InvalidEmailException } from "@exceptions/InvalidEmailException";
import { InvalidPwdException } from "@exceptions/InvalidPwdException";


export class RegistrationRequestDto implements RequestDto {

    private username: string;
    private email: string;
    private pwd: string;

    public constructor(username: string, email: string, pwd: string) {
        this.username = username;
        this.email = email;
        this.pwd = pwd;
    }

    public isRequiredAvailable(): boolean {
        return this.isParamsValid(this.email, this.pwd);
    }

    public validateRequest(): void {
        this.isEmailValid(this.email);
        this.isPwdValid(this.pwd);
    }

    private isParamsValid(...args: string[]): boolean {
        for (let param of args) {
            if (!param || param.trim().length === 0) return false;
        }
        return true;
    }

    private isEmailValid(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) throw new InvalidEmailException("Given email is not in a valid format");
        return true;
    }

    private isPwdValid(pwd: string): boolean {
        if (pwd.length < 10) throw new InvalidPwdException("Password should contain atleast 10 characters");
        return true;
    }

    public getUsername(): string { return this.username; }

    public getEmail(): string { return this.email; }

    public getPwd(): string { return this.pwd; }
}