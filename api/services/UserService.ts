import { UserExistsException } from "../exceptions/UserExistsException";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { WrongPasswordException } from "../exceptions/WrongPasswordException";
import { UserRepository } from "../repository/UserRepository";
import bcrypt from 'bcrypt';
import { TOKEN_ISSUER, TOKEN_SUBJECT, TOKEN_AUDIENCE } from "./JwtService";
import { UserModel } from "../domain/models/User";
const jwtService = require("./JwtService");

/**
 * User service
 */
export class UserService {

    private static pwdHashSaltRound: number = 8;
    private repository: UserRepository;

    public constructor() {
        this.repository = new UserRepository(UserModel);
    }

    public async createUser(username: string, email: string, rawPwd: string): Promise<string> {
        const user = await this.repository.findByEmail(email);
        if (user) throw new UserExistsException("User already exists");
        const hashedUserPwd = await bcrypt.hash(rawPwd, UserService.pwdHashSaltRound);
        if (username.length !== 0) await this.repository.save(username, email, hashedUserPwd);
        else await this.repository.save(email, email, hashedUserPwd);

        return jwtService.sign(JSON.parse(JSON.stringify({ username, email })), {
            issuer: TOKEN_ISSUER,
            subject: TOKEN_SUBJECT,
            audience: TOKEN_AUDIENCE,
        });
    }

    public async login(email: string, rawPwd: string): Promise<string> {
        const user = await this.repository.findByEmail(email);
        if (!user) throw new UserNotFoundException("User not found");
        if (!(await bcrypt.compare(rawPwd, user.pwd))) throw new WrongPasswordException("Password is wrong for the given account");
        const username = user.username;

        return jwtService.sign(JSON.parse(JSON.stringify({ username, email })), {
            issuer: TOKEN_ISSUER,
            subject: TOKEN_SUBJECT,
            audience: TOKEN_AUDIENCE,
        });
    }
}