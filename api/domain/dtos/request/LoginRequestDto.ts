import { RequestDto } from "@dtos/request/RequestDto";


export class LoginRequestDto implements RequestDto {

    private email: string;
    private pwd: string;

    public constructor(email: string, pwd: string) {
        this.email = email;
        this.pwd = pwd;
    }

    public isRequiredAvailable(): boolean {
        return this.isParamsValid(this.email, this.pwd);
    }

    private isParamsValid(...args: string[]): boolean {
        for (let param of args) {
            if (!param || param.trim().length === 0) return false;
        }
        return true;
    }

    public getEmail(): string { return this.email; }

    public getPwd(): string { return this.pwd; }
}