import { User, UserModel } from "../domain/models/User";
import { PFTException } from "../exceptions/PFTException";
const dbConnection = require("../middlewares/db-config");

/**
 * User repository
 */
export class UserRepository {

    private model: typeof UserModel;

    public constructor(model: typeof UserModel) {
        // this.db = dbConnection.db("pft-db");
        // this.collection = this.db.collection("user");
        this.model = model;
    }

    public async save(username: string, email: string, hashedUserPwd: string): Promise<void> {
        const user: User = new this.model({ username: username, email: email, pwd: hashedUserPwd });
        try {
            await user.save();
        } catch (e) {
            console.error(e);
            throw new PFTException("Error occurred when saving a user to db", e as Error);
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            const user: User | null = await this.model.findOne({ email: email });
            return user ? user.toObject() : null;
        } catch (e) {
            console.error(e);
            throw new PFTException("Error occurred when finding user by email from db", e as Error);
        }
    }
}